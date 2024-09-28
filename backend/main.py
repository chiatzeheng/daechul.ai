from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import requests
from io import BytesIO
import json
from openai import OpenAI
from predibase import Predibase
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
import logging
from prompts import (
    FINANCIAL_ANALYSIS_PROMPT,
    STRATEGY_ANALYSIS_PROMPT,
    COMPLIANCE_ANALYSIS_PROMPT,
    RISK_ANALYSIS_PROMPT,
    PERFORMANCE_ANALYSIS_PROMPT,
    system
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

UPSTAGE_API_KEY = os.environ["UPSTAGE_API_KEY"]
PB_API_KEY = os.environ["PB_API_KEY"]
tenant_id = os.environ["TENANT_ID"]
base_model = "solar-1-mini-chat-240612"
adapter_id = "daechul-ai-modelv4/7"
pb = Predibase(api_token=PB_API_KEY)
client = OpenAI(api_key=UPSTAGE_API_KEY, base_url="https://api.upstage.ai/v1/solar")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoanRequest(BaseModel):
    data: dict
    documents: List[str]


def query_adapter(
    context,
    corporation_data,
    prompt,
    adapter_id=adapter_id,
    tenant_id=tenant_id,
    base_model=base_model,
    PB_API_KEY=PB_API_KEY,
):
    logger.info("Starting query_adapter function")
    url = f"https://serving.app.predibase.com/{tenant_id}/deployments/v2/llms/{base_model}/generate"
    payload = {
        "inputs": prompt.format(
            context=context, corporation_data=json.dumps(corporation_data, indent=2)
        ),
        "parameters": {
            "adapter_id": adapter_id,
            "adapter_source": "pbase",
            "temperature": 0.2,
            "max_new_tokens": 2000,
        },
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {PB_API_KEY}",
    }
    logger.info(f"Sending request to {url}")
    response = requests.post(url=url, data=json.dumps(payload), headers=headers)
    logger.info(f"Received response with status code: {response.status_code}")

    try:
        response_json = response.json()
        generated_text = response_json.get("generated_text")
        if not generated_text:
            logger.error("No generated text in the API response")
            raise ValueError("No generated text in the API response")

        result = json.loads(generated_text)
        logger.info("Successfully parsed generated text as JSON")
        return result
    except Exception as e:
        logger.error(f"Error processing API response: {str(e)}")
        raise


def prompt_summarize(context, client=client):
    logger.info("Starting prompt_summarize function")
    stream = client.chat.completions.create(
        model="solar-1-mini-chat",
        messages=system
        stream=False,
    )
    logger.info("Completed prompt_summarize function")
    return stream.choices[0].message.content


def process_financial_statement(
    file_url,
    url="https://api.upstage.ai/v1/document-ai/layout-analysis",
    API_KEY=UPSTAGE_API_KEY,
):
    logger.info(f"Processing financial statement from URL: {file_url}")
    response = requests.get(file_url)
    response.raise_for_status()

    file_data = BytesIO(response.content)
    headers = {"Authorization": f"Bearer {API_KEY}"}
    files = {"document": file_data}

    logger.info(f"Sending request to {url}")
    api_response = requests.post(url, headers=headers, files=files)
    api_response.raise_for_status()

    obj = api_response.json()
    logger.info(f"Received response with {obj['billed_pages']} pages")

    context = ""
    for page in range(obj["billed_pages"]):
        page_content = ""
        for element in obj["elements"]:
            if element["page"] == page:
                if element["category"] == "table":
                    page_content += f"\n{element['html']}"
                else:
                    page_content += f"\n{element['text']}"
        context += prompt_summarize(page_content)

    logger.info("Completed processing financial statement")
    return context


@app.post("/evaluate-financials")
async def evaluate_financials(request: LoanRequest):
    logger.info("Evaluating financials")
    try:
        financial_context = ""
        for url in request.documents:
            financial_context += process_financial_statement(url) + "\n\n"

        financial_analysis = query_adapter(
            financial_context, request.data, FINANCIAL_ANALYSIS_PROMPT
        )
        return financial_analysis
    except Exception as e:
        logger.error(f"Error evaluating financials: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to evaluate financials")


@app.post("/evaluate-strategy")
async def evaluate_strategy(request: LoanRequest):
    logger.info("Evaluating business strategy")
    try:
        strategy_analysis = query_adapter(
            request.data.get("business_plan", ""),
            request.data,
            STRATEGY_ANALYSIS_PROMPT,
        )
        return strategy_analysis
    except Exception as e:
        logger.error(f"Error evaluating strategy: {str(e)}")
        raise HTTPException(
            status_code=500, detail="Failed to evaluate business strategy"
        )


@app.post("/evaluate-compliance")
async def evaluate_compliance(request: LoanRequest):
    logger.info("Evaluating compliance")
    try:
        compliance_analysis = query_adapter(
            request.data.get("business_registration", ""),
            request.data,
            COMPLIANCE_ANALYSIS_PROMPT,
        )
        return compliance_analysis
    except Exception as e:
        logger.error(f"Error evaluating compliance: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to evaluate compliance")


@app.post("/evaluate-performance")
async def evaluate_performance(request: LoanRequest):
    logger.info("Evaluating business performance")
    try:
        performance_context = process_financial_statement(
            request.documents[0]
        )  # Assuming first document is most recent
        performance_analysis = query_adapter(
            performance_context, request.data, PERFORMANCE_ANALYSIS_PROMPT
        )
        return performance_analysis
    except Exception as e:
        logger.error(f"Error evaluating performance: {str(e)}")
        raise HTTPException(
            status_code=500, detail="Failed to evaluate business performance"
        )


@app.post("/evaluate-risk")
async def evaluate_risk(request: LoanRequest):
    logger.info("Evaluating risk")
    try:
        risk_analysis = query_adapter(
            json.dumps(request.data), request.data, RISK_ANALYSIS_PROMPT
        )
        return risk_analysis
    except Exception as e:
        logger.error(f"Error evaluating risk: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to evaluate risk")


@app.post("/evaluate-loan")
async def evaluate_loan(request: LoanRequest):
    logger.info("Received loan evaluation request")
    try:
        financials = await evaluate_financials(request)
        strategy = await evaluate_strategy(request)
        compliance = await evaluate_compliance(request)
        performance = await evaluate_performance(request)
        risk = await evaluate_risk(request)

        # Combine all results
        result = {
            "financials": financials,
            "strategy": strategy,
            "compliance": compliance,
            "performance": performance,
            "risk": risk,
        }

        logger.info("Successfully processed loan application")
        return result
    except Exception as e:
        logger.error(f"Unexpected error processing loan application: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while processing the loan application",
        )


if __name__ == "__main__":
    import uvicorn

    logger.info("Starting the FastAPI application")
    uvicorn.run(app, host="0.0.0.0", port=8000)

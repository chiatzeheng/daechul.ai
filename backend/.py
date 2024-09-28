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
    allow_origins=["http://localhost:3000"],  # Replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoanRequest(BaseModel):
    data: dict
    documents: List[str]


import json


def query_adapter(
    context,
    corporation_data,
    adapter_id=adapter_id,
    tenant_id=tenant_id,
    base_model=base_model,
    PB_API_KEY=PB_API_KEY,
):
    logger.info("Starting query_adapter function with enhanced prompt")
    prompt = f"""
    <|im_start|> system
    You are an expert financial analyst and loan officer at a prestigious bank. Your task is to conduct a comprehensive evaluation of a loan application based on the provided financial statements and corporation data. Your analysis should be thorough, detailed, and consider all aspects of the application. 

    Here's what you need to do:

    1. Analyze the latest financial data and corporation information in great detail.
    2. Evaluate the loan application considering industry standards, market conditions, and economic factors.
    3. Determine the applicant's creditworthiness and ability to repay the loan.
    4. Assess the risk level associated with granting this loan.
    5. Consider the loan purpose and how it aligns with the business's growth strategy.
    6. Evaluate the property details if it's a property-related loan.
    7. Analyze the business's financial health, including revenue trends, profitability, and cash flow.
    8. Consider the business's age, size, and industry position.
    9. Assess the creditworthiness of the primary contact and any co-borrowers.
    10. Provide a final recommendation on whether to approve or deny the loan application.

    Your analysis must be backed up with specific financial figures, ratios, and data points from the provided information. Be sure to reference relevant parts of the financial statements and corporation data in your explanations.

    The output must be in JSON format, following the structure below:

    {{
        "loan_decision": "approve" or "deny",
        "confidence_score": (a number between 0 and 100),
        "risk_assessment": {{
            "overall_risk_level": "low", "medium", or "high",
            "financial_health_score": (a number between 0 and 100),
            "repayment_capacity_score": (a number between 0 and 100),
            "collateral_quality_score": (a number between 0 and 100)
        }},
        "financial_analysis": {{
            "revenue_trend": "(description of revenue trend with specific figures)",
            "profitability_analysis": "(detailed analysis of profitability ratios)",
            "liquidity_assessment": "(assessment of current and quick ratios)",
            "debt_structure": "(analysis of debt-to-equity and other relevant ratios)"
        }},
        "business_evaluation": {{
            "industry_position": "(evaluation of the business's position in its industry)",
            "growth_potential": "(assessment of future growth prospects)",
            "management_capability": "(evaluation of the management team's experience and capability)"
        }},
        "loan_purpose_alignment": "(detailed explanation of how the loan purpose aligns with business goals)",
        "property_evaluation": "(if applicable, detailed assessment of the property)",
        "key_strengths": [
            "(list at least 3 key strengths with detailed explanations)"
        ],
        "key_concerns": [
            "(list at least 3 key concerns or risks with detailed explanations)"
        ],
        "mitigating_factors": [
            "(list any factors that mitigate the identified risks)"
        ],
        "recommended_loan_terms": {{
            "interest_rate": "(recommended interest rate based on risk assessment)",
            "loan_term": "(recommended loan term in months or years)",w
            "collateral_requirements": "(any specific collateral requirements)",
            "special_conditions": [
                "(list any special conditions or covenants for the loan)"
            ]
        }},
        "final_recommendation": "(detailed explanation of the final loan decision, at least 200 words)"
    }}

    Ensure that all string values are properly enclosed in double quotes.

    <|im_start|> user
    Corporation Data:
    {json.dumps(corporation_data, indent=2)}

    Financial Statements:
    {context}
    """

    url = f"https://serving.app.predibase.com/{tenant_id}/deployments/v2/llms/{base_model}/generate"
    payload = {
        "inputs": prompt,
        "parameters": {
            "adapter_id": adapter_id,
            "adapter_source": "pbase",
            "temperature": 0.2,
            "max_new_tokens": 2000,  # Increased token limit for larger response
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
        logger.debug(f"Raw API response: {response_json}")
        generated_text = response_json.get("generated_text")
        if not generated_text:
            logger.error("No generated text in the API response")
            raise ValueError("No generated text in the API response")

        # Try to parse the generated text as JSON
        try:
            result = json.loads(generated_text)
            logger.info("Successfully parsed generated text as JSON")
            return result
        except json.JSONDecodeError as json_err:
            logger.error(f"Failed to parse generated text as JSON: {json_err}")
            logger.debug(f"Generated text: {generated_text}")
            raise ValueError(f"Invalid JSON in generated text: {json_err}")

    except Exception as e:
        logger.error(f"Error processing API response: {str(e)}")
        raise


def prompt_summarize(context, client=client):
    logger.info("Starting prompt_summarize function")
    stream = client.chat.completions.create(
        model="solar-1-mini-chat",
        messages=[
            {
                "role": "system",
                "content": """
                You are an expert in financial analysis. Below is a page from a financial statement document. 
                Your task is to summarize the key financial information, including all relevant numerical figures, trends, and notable observations. 
                Ensure that no important numerical data is omitted. Your summary should be clear, concise, and no longer than 200 words, focusing only on the most significant details. 
                If you find the page lacks sufficient information for a summary, you MUST return an empty response.
                """,
            },
            {
                "role": "user",
                "content": f"""
                This is the text you are to summarize:
                {context}
                """,
            },
        ],
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


def loan_evaluation(corporation_data, financial_statement_urls):
    logger.info("Starting loan evaluation")
    combined_context = ""
    for url in financial_statement_urls:
        combined_context += process_financial_statement(url) + "\n\n"

    loan_results = query_adapter(combined_context, corporation_data)
    logger.info("Completed loan evaluation")
    return loan_results


@app.post("/evaluate-loan")
async def evaluate_loan(request: LoanRequest):
    logger.info("Received loan evaluation request")
    logger.info(request.data)
    try:
        result = loan_evaluation(request.data, request.documents)
        if result is None:
            logger.error("Failed to process the loan application")
            raise HTTPException(
                status_code=500, detail="Failed to process the loan application"
            )
        logger.info("Successfully processed loan application")
        return result
    except ValueError as ve:
        logger.error(f"Value error in loan application processing: {str(ve)}")
        raise HTTPException(status_code=500, detail=str(ve))
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

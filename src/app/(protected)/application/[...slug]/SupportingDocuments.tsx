import LoanUpload from '@/components/LoanUpload';

const SupportingDocuments = () => {
    return (
        <>
            <h3 className="text-lg font-semibold">Required Documents</h3>
            <p className="text-sm text-gray-600">Please upload the following documents:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-2">
                <li>Business Tax Returns (last 3 years)</li>
                <li>Personal Tax Returns of owners (last 3 years)</li>
                <li>Financial Statements (Balance Sheet and Income Statement)</li>
                <li>Business Plan</li>
                <li>Proof of Business Registration</li>
            </ul>
            <LoanUpload />
        </>
    );
}


export default SupportingDocuments;


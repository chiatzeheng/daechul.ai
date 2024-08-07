import Loan from './ApprovedLoan';
import PendingLoan from './PendingLoan';
import RejectedLoan from './RejectedLoan';
import { loans } from '@/lib/data';

const LoansDisplay = () => {
    if (!loans || loans.length === 0) {
        return <p className="text-white">No loans found.</p>;
    }


    return (
        <>
            {loans.map((loan, index) => {
                switch (loan.status) {
                    case 'Approved':
                        return <Loan key={`approved-${index}`} loan={loan} />;
                    case 'Pending':
                        return <PendingLoan key={`pending-${index}`} loan={loan} />;
                    case 'Rejected':
                        return <RejectedLoan key={`rejected-${index}`} loan={{ ...loan, reason: loan.reason || 'Not specified' }} />;
                }
            })}
        </>
    );
};

export default LoansDisplay;
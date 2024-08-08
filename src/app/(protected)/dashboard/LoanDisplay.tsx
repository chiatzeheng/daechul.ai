import { ApprovedLoan, PendingLoan, RejectedLoan } from './Loans';
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
                        return <ApprovedLoan key={`approved-${index}`} loan={loan} />;
                    case 'Pending':
                        return <PendingLoan key={`pending-${index}`} loan={loan} />;
                    case 'Rejected':
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        return <RejectedLoan key={`rejected-${index}`} loan={{ ...loan, reason: loan?.reason || 'Not specified' }} />;
                }
            })}
        </>
    );
};

export default LoansDisplay;
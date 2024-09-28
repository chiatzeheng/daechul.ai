export const initialNodes = [

    {
        id: '2',
        type: 'custom',
        data: {
            label: 'Financials',
            description: 'Analyze financial health',
            status: 'yellow',
            details: {
                keyMetrics: ['Revenue trends', 'Profitability ratios', 'Liquidity ratios', 'Debt structure']
            }
        },
        position: { x: 450, y: 150 },
    },
    {
        id: '3',
        type: 'custom',
        data: {
            label: 'Strategy',
            description: 'Evaluate business plan',
            status: 'green',
            details: {
                focusAreas: ['Market analysis', 'Competitive advantage', 'Growth projections', 'Operational strategy']
            }
        },
        position: { x: 250, y: 300 },
    },
    {
        id: '4',
        type: 'custom',
        data: {
            label: 'Compliance',
            description: 'Check legal status',
            status: 'green',
            details: {
                checkpoints: ['Business registration', 'Tax compliance', 'Industry-specific regulations', 'Legal issues']
            }
        },
        position: { x: 250, y: 450 },
    },
    {
        id: '5',
        type: 'custom',
        data: {
            label: 'Performance',
            description: 'Assess business metrics',
            status: 'yellow',
            details: {
                indicators: ['Operational efficiency', 'Market performance', 'Customer satisfaction', 'Employee productivity']
            }
        },
        position: { x: 250, y: 600 },
    },
    {
        id: '6',
        type: 'custom',
        data: {
            label: 'Risk',
            description: 'Evaluate potential risks',
            status: 'red',
            details: {
                riskFactors: ['Market risks', 'Operational risks', 'Financial risks', 'Legal and compliance risks']
            }
        },
        position: { x: 250, y: 750 },
    },
    {
        id: '7',
        type: 'custom',
        data: {
            label: 'Loan Decision',
            description: 'Final evaluation',
            status: 'yellow',
            details: {
                reportComponents: [
                    'Financial health assessment',
                    'Cash flow analysis and projections',
                    'Risk assessment based on industry standards',
                    'Verification of business legitimacy and registration',
                    'Evaluation of the business plan feasibility',
                    'Recommendation for mortgage approval or denial'
                ]
            }
        },
        position: { x: 250, y: 900 },
    },
];

export const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e3-4', source: '3', target: '4' },
    { id: 'e4-5', source: '4', target: '5' },
    { id: 'e5-6', source: '5', target: '6' },
    { id: 'e6-7', source: '6', target: '7' },
];
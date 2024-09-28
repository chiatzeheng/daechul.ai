import { Badge } from './ui/badge';
import {
    Handle,
    Position
} from 'reactflow'

const CustomNode = ({ data }) => {
    const color = data.status === 'green' ? 'green-100' : data.status === 'yellow' ? 'yellow-100' : 'red-100';

    return (
        <div className={'px-4 py-2 shadow-md rounded-md border-2 w-64'}>
            <Handle type="target" position={Position.Top} />
            <div className="font-bold">{data.label}</div>
            <div className="text-sm">{data.description}</div>
            <Badge className={`bg-${color} border-bg-${color} mt-2 text-grey-200`}>{data.status}</Badge>
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default CustomNode
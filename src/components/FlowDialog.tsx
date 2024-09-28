import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"

const FlowDialog = ({ selectedNode, closeDialog }) => {
    return (
        <Dialog open={selectedNode !== null} onOpenChange={closeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{selectedNode?.data.label}</DialogTitle>
                    <DialogDescription>
                        <p className="mb-4">{selectedNode?.data.description}</p>
                        {selectedNode?.data.details && (
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Details:</h3>
                                <ul className="list-disc list-inside space-y-2">
                                    {Object.entries(selectedNode?.data.details).map(([key, value]) => (
                                        <li key={key}>
                                            <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                                            <ul className="list-disc list-inside ml-4">
                                                {Array.isArray(value) ? value.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                )) : value}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {['2', '3', '4', '5', '6'].includes(selectedNode?.id) && (
                            <Button className="mt-4" onClick={closeDialog}>Run Analysis</Button>
                        )}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default FlowDialog
import { CrossIcon } from "../icons/CrossIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { DeleteIcon } from "../icons/DeleteIcon";

export interface ContextModelProps {
    open: boolean;
    onClose: () => void;
    context: string;
    title: string;
    link: string;
    type: string;
    dateAdded: string;
    tags?: string[];
    shareHandler?: () => void;
    deleteHandler?: () => void;
}

export function ContextModal({open, onClose, context, title, link, type, dateAdded, tags, shareHandler, deleteHandler} : ContextModelProps){
    const getTypeIcon = (type: string) => {
        switch(type) {
            case 'youtube': return '🎥';
            case 'twitter': return '🐦';
            case 'note': return '📝';
            case 'article': return '📄';
            default: return '📄';
        }
    };

    const getTypeLabel = (type: string) => {
        switch(type) {
            case 'youtube': return 'YouTube Video';
            case 'twitter': return 'Twitter Post';
            case 'note': return 'Note';
            case 'article': return 'Article';
            default: return 'Content';
        }
    };

    return (
        <div>
            {open && <>
                <div className="w-screen h-screen bg-slate-900 fixed top-0 left-0 z-40 opacity-60"></div>
                <div className="fixed z-50 w-screen h-screen flex justify-center items-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-200">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{getTypeIcon(type)}</span>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">{title}</h2>
                                    <p className="text-sm text-slate-500">{getTypeLabel(type)} • Added on {dateAdded}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                {shareHandler && (
                                    <button 
                                        onClick={shareHandler}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                        title="Share"
                                    >
                                        <ShareIcon size="md" color="text-slate-400"/>
                                    </button>
                                )}
                                {deleteHandler && (
                                    <button 
                                        onClick={deleteHandler}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <DeleteIcon size="md" color="text-slate-400"/>
                                    </button>
                                )}
                                <button 
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <CrossIcon size="lg" />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                            {/* Link/Note Section */}
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold text-slate-700 mb-3">Source</h3>
                                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                                    {type === 'note' ? (
                                        <div>
                                            <p className="text-sm text-slate-600 mb-2">Note Content:</p>
                                            <p className="text-slate-800 whitespace-pre-wrap">{link}</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className="text-sm text-slate-600 mb-2">Link:</p>
                                            <a 
                                                href={link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-emerald-600 hover:text-emerald-700 underline break-all"
                                            >
                                                {link}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tags Section */}
                            {tags && tags.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-slate-700 mb-3">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag, idx) => (
                                            <span 
                                                key={idx} 
                                                className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Context Section */}
                            <div>
                                <h3 className="text-lg font-semibold text-slate-700 mb-3">AI Context</h3>
                                <div className="bg-gradient-to-br from-emerald-50 to-white rounded-lg p-6 border border-emerald-200">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                                                <span className="text-emerald-600 text-sm font-bold">AI</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-slate-800 leading-relaxed whitespace-pre-wrap">
                                                {context}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
        
    )       
}

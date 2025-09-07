import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { ContextModal } from '../components/ContextModal';
import { PersonaIcon } from '../icons/PersonaIcon';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface Content {
    _id: string;
    type: string;
    link: string;
    title: string;
    dateAdded: string;
    context: string;
    tags?: string[];
}

interface ShareData {
    username: string;
    content: Content[];
}

export function ShareView() {
    const { shareId } = useParams<{ shareId: string }>();
    const [shareData, setShareData] = useState<ShareData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [contextModalOpen, setContextModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState<Content | null>(null);

    useEffect(() => {
        const fetchSharedContent = async () => {
            if (!shareId) {
                setError('Invalid share link');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareId}`);
                setShareData(response.data);
            } catch (error: any) {
                if (error.response?.status === 411) {
                    setError('Share link not found or has expired');
                } else {
                    setError('Failed to load shared content');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSharedContent();
    }, [shareId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading shared content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-4">
                    <div className="mb-6">
                        <PersonaIcon />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">Oops!</h1>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <Link 
                        to="/" 
                        className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        Go to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (!shareData || shareData.content.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-4">
                    <div className="mb-6">
                        <PersonaIcon />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 mb-4">No Content Yet</h1>
                    <p className="text-slate-600 mb-6">This brain hasn't been populated with content yet.</p>
                    <Link 
                        to="/" 
                        className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        Explore PersonAI
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Header */}
            <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <Link to="/" className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700">
                                <PersonaIcon />
                                <span className="font-bold text-xl">PersonAI</span>
                            </Link>
                            <div className="h-6 w-px bg-slate-300"></div>
                            <div>
                                <h1 className="text-lg font-semibold text-slate-800">
                                    {shareData.username}'s Brain
                                </h1>
                                <p className="text-sm text-slate-500">
                                    {shareData.content.length} {shareData.content.length === 1 ? 'item' : 'items'} shared
                                </p>
                            </div>
                        </div>
                        <Link 
                            to="/" 
                            className="text-slate-600 hover:text-slate-800 transition-colors"
                        >
                            Explore PersonAI
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">
                            Shared Knowledge
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Explore the curated content from {shareData.username}'s personal knowledge base. 
                            Click on any card to view detailed context and insights.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {shareData.content.map((content) => (
                            <Card 
                                key={content._id}
                                type={content.type}
                                link={content.link}
                                title={content.title}
                                dateAdded={content.dateAdded}
                                context={content.context}
                                tags={content.tags}
                                shareHandler={() => {
                                    window.open(content.link, '_blank');
                                }}
                                onContextClick={() => {
                                    setSelectedContent(content);
                                    setContextModalOpen(true);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Context Modal */}
            {selectedContent && (
                <ContextModal 
                    open={contextModalOpen}
                    onClose={() => {
                        setContextModalOpen(false);
                        setSelectedContent(null);
                    }}
                    context={selectedContent.context}
                    title={selectedContent.title}
                    link={selectedContent.link}
                    type={selectedContent.type}
                    dateAdded={selectedContent.dateAdded}
                    tags={selectedContent.tags}
                    shareHandler={() => {
                        window.open(selectedContent.link, '_blank');
                    }}
                />
            )}
        </>
    );
}
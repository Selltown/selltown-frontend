import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import MobileMenu from "./mobileMenu";

const PageHeader = ({ title }) => {
    const navigate = useNavigate();

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between border-b border-neutral-300 bg-background px-2 py-4">
            <div className="flex items-center gap-2 px-2">
                <button
                    onClick={() => navigate(-1)}
                    aria-label="Go back"
                >
                    <ArrowLeft size={20} />
                </button>

                <h1 className="text-lg font-semibold">
                    {title}
                </h1>
            </div>

            <MobileMenu />
        </nav>
    );
};

export default PageHeader;

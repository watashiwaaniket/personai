import { useNavigate } from "react-router-dom";
import { PersonaIcon } from "../../icons/PersonaIcon";
import { Button } from "../Button";

export function Navbar() {
    const navigate = useNavigate();
    return(
        <div className="flex justify-between items-center px-4 py-3">
            <h2 className="text-green-400 text-xl lg:text-2xl p-2 flex items-center"><PersonaIcon /> personAI</h2>
            <div className="flex">
                <Button variant="primary" size="sm" text="Login" onClick={() => navigate('/signin')}/>
                <Button variant="secondary" size="sm" text="Signup" onClick={() => navigate('/signup')}/>
            </div>
        </div>
    )
}
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function Signup(){
    return(
        <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
            <div className="bg-white flex flex-col rounded-xl border min-w-48 p-8">
                <Input placeholder="Username" inputType="short"/>
                <Input placeholder="Password" inputType="short" />
                <div className="flex justify-center pt-4">
                    <Button variant="primary" text="Signup" size="md" fullWidth={true} loading={false} />
                </div>
            </div>
        </div>
    )
}
import ImageUpload from "./image/image-upload";


export default function HerolImageUpload(){
    return (
        <div>
            <div className="text-center">
                Upload an image to get started
                <div className="mt-10 border">
                    <ImageUpload/>
                </div>
            </div>
            
        </div>
    )
}
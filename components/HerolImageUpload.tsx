import ImageUpload from "./image/image-upload";
import DefaultImages from '@/components/image/DefaultImages';

export default function HerolImageUpload(){
    return (
        <div className="w-4/5 m-auto">
            <div className="text-center">
                <h2 className="text-muted-foreground lg:text-xl">Upload an image or select one of these images to get started</h2>
                <div className="mt-5 flex gap-2">
                    <div className="w-1/2 ">
                        <ImageUpload/>
                    </div>
                    <div className="w-1/2">
                        <DefaultImages />
                    </div>
                </div>
            </div>
            
        </div>
    )
}
import EditImage from '@/components/image/edit-image';
export default function Page({params}: {params: {url:string}}){
    return(
        <EditImage url={params.url}/>
    )
}
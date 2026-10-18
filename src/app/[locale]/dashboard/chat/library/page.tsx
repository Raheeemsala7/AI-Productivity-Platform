import ImagesLibraryView from "@/features/library/components/images-library-view";
import { getAllFilesLibrary } from "@/features/library/apis/library.api";

export default async function LibraryPage() {
    const res = await getAllFilesLibrary();
    const initialFiles = res.success && res.payload?.files ? res.payload.files : [];

    return <ImagesLibraryView initialFiles={initialFiles} />;
}

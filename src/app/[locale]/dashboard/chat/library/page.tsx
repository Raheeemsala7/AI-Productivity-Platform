import ImagesLibraryView from "@/features/library/components/images-library-view";
import { getAllFilesLibrary } from "@/features/library/apis/library.api";
import { isSupportedLibraryFile } from "@/features/library/utils/library.util";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
    const res = await getAllFilesLibrary();
    const files = (res.success && res.payload?.files ? res.payload.files : []).filter((f) =>
        isSupportedLibraryFile(f.name)
    );

    return <ImagesLibraryView files={files} />;
}

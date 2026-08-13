import { VerifyEmailContent } from "@/features/auth/_components/verify-email-content";

type Props = {
    searchParams: Promise<{
        id?: string;
        hash?: string;
        expires?: string;
        signature?: string;
    }>;
};

export default async function VerifyEmailPage({ searchParams }: Props) {
    const { id, hash, expires, signature } = await searchParams;

    return (
        <VerifyEmailContent
            id={id}
            hash={hash}
            expires={expires}
            signature={signature}
        />
    );
}

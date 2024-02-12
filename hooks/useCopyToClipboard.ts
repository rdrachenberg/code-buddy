import { useCallback, useState } from "react"

export default function useCopyToClipboard() {
    const [isCopied, setIsCopied] = useState(false);

    const copy = useCallback(async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);

            setTimeout(() => setIsCopied(false), 2000)

        } catch (error) {
            console.log('didnt copy correctly', error);
            setIsCopied(false);
        }

    }, [])

    return [isCopied, copy] as const
}

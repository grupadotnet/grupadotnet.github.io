
export function Button({text, target}: { text?:string, target?: string }) {
    return (
        <a className={"m-5 button"} href={target}>{text}</a>
    )
}


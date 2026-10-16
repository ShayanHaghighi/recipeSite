export default function RecipeTag({tag}: { tag: string }) {
    return (
        <span
            className="inline-flex items-center font-semibold text-accent rounded-full bg-accent/10 px-2.5 py-1 text-xs border-accent/50 border"
        >
             {tag}
        </span>
    )
}
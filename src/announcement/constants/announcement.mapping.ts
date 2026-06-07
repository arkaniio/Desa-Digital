export const WHERE_CLAUSE_SEARCH_ANNOUNCEMENT = (WHERE_CLAUSE: any, IsSearch: any, authorId: number) => {

    const isNumber = IsSearch?.trim() !== "" && !isNaN(Number(IsSearch))
    const Number_convert = isNumber ? Number(IsSearch) : undefined

    const where: typeof WHERE_CLAUSE = {
        OR: [
            {
                Title: {
                    contains: IsSearch,
                    mode: "insensitive"
                }
            },
            {
                Content: {
                    contains: IsSearch,
                    mode: "insensitive"
                }
            },
            ...(isNumber ? [
                {
                    RtId: {
                        equals: Number_convert
                    },
                    RwId: {
                        equals: Number_convert
                    }
                }
            ] : []
            )
        ],
        AuthorId: authorId
    }

    return where
}
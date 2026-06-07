"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WHERE_CLAUSE_SEARCH_ANNOUNCEMENT = void 0;
const WHERE_CLAUSE_SEARCH_ANNOUNCEMENT = (WHERE_CLAUSE, IsSearch, authorId) => {
    const isNumber = IsSearch?.trim() !== "" && !isNaN(Number(IsSearch));
    const Number_convert = isNumber ? Number(IsSearch) : undefined;
    const where = {
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
            ] : [])
        ],
        AuthorId: authorId
    };
    return where;
};
exports.WHERE_CLAUSE_SEARCH_ANNOUNCEMENT = WHERE_CLAUSE_SEARCH_ANNOUNCEMENT;
//# sourceMappingURL=announcement.mapping.js.map
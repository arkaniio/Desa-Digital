import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type IdentityModel = runtime.Types.Result.DefaultSelection<Prisma.$IdentityPayload>;
export type AggregateIdentity = {
    _count: IdentityCountAggregateOutputType | null;
    _avg: IdentityAvgAggregateOutputType | null;
    _sum: IdentitySumAggregateOutputType | null;
    _min: IdentityMinAggregateOutputType | null;
    _max: IdentityMaxAggregateOutputType | null;
};
export type IdentityAvgAggregateOutputType = {
    id: number | null;
    User_Id: number | null;
    Age: number | null;
};
export type IdentitySumAggregateOutputType = {
    id: number | null;
    User_Id: number | null;
    Age: number | null;
};
export type IdentityMinAggregateOutputType = {
    id: number | null;
    User_Id: number | null;
    Full_Name: string | null;
    Age: number | null;
    Adress: string | null;
    Created_at: Date | null;
    Updated_at: Date | null;
};
export type IdentityMaxAggregateOutputType = {
    id: number | null;
    User_Id: number | null;
    Full_Name: string | null;
    Age: number | null;
    Adress: string | null;
    Created_at: Date | null;
    Updated_at: Date | null;
};
export type IdentityCountAggregateOutputType = {
    id: number;
    User_Id: number;
    Full_Name: number;
    Age: number;
    Adress: number;
    Created_at: number;
    Updated_at: number;
    _all: number;
};
export type IdentityAvgAggregateInputType = {
    id?: true;
    User_Id?: true;
    Age?: true;
};
export type IdentitySumAggregateInputType = {
    id?: true;
    User_Id?: true;
    Age?: true;
};
export type IdentityMinAggregateInputType = {
    id?: true;
    User_Id?: true;
    Full_Name?: true;
    Age?: true;
    Adress?: true;
    Created_at?: true;
    Updated_at?: true;
};
export type IdentityMaxAggregateInputType = {
    id?: true;
    User_Id?: true;
    Full_Name?: true;
    Age?: true;
    Adress?: true;
    Created_at?: true;
    Updated_at?: true;
};
export type IdentityCountAggregateInputType = {
    id?: true;
    User_Id?: true;
    Full_Name?: true;
    Age?: true;
    Adress?: true;
    Created_at?: true;
    Updated_at?: true;
    _all?: true;
};
export type IdentityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityWhereInput;
    orderBy?: Prisma.IdentityOrderByWithRelationInput | Prisma.IdentityOrderByWithRelationInput[];
    cursor?: Prisma.IdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | IdentityCountAggregateInputType;
    _avg?: IdentityAvgAggregateInputType;
    _sum?: IdentitySumAggregateInputType;
    _min?: IdentityMinAggregateInputType;
    _max?: IdentityMaxAggregateInputType;
};
export type GetIdentityAggregateType<T extends IdentityAggregateArgs> = {
    [P in keyof T & keyof AggregateIdentity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateIdentity[P]> : Prisma.GetScalarType<T[P], AggregateIdentity[P]>;
};
export type IdentityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityWhereInput;
    orderBy?: Prisma.IdentityOrderByWithAggregationInput | Prisma.IdentityOrderByWithAggregationInput[];
    by: Prisma.IdentityScalarFieldEnum[] | Prisma.IdentityScalarFieldEnum;
    having?: Prisma.IdentityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: IdentityCountAggregateInputType | true;
    _avg?: IdentityAvgAggregateInputType;
    _sum?: IdentitySumAggregateInputType;
    _min?: IdentityMinAggregateInputType;
    _max?: IdentityMaxAggregateInputType;
};
export type IdentityGroupByOutputType = {
    id: number;
    User_Id: number;
    Full_Name: string;
    Age: number;
    Adress: string;
    Created_at: Date;
    Updated_at: Date;
    _count: IdentityCountAggregateOutputType | null;
    _avg: IdentityAvgAggregateOutputType | null;
    _sum: IdentitySumAggregateOutputType | null;
    _min: IdentityMinAggregateOutputType | null;
    _max: IdentityMaxAggregateOutputType | null;
};
export type GetIdentityGroupByPayload<T extends IdentityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<IdentityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof IdentityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], IdentityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], IdentityGroupByOutputType[P]>;
}>>;
export type IdentityWhereInput = {
    AND?: Prisma.IdentityWhereInput | Prisma.IdentityWhereInput[];
    OR?: Prisma.IdentityWhereInput[];
    NOT?: Prisma.IdentityWhereInput | Prisma.IdentityWhereInput[];
    id?: Prisma.IntFilter<"Identity"> | number;
    User_Id?: Prisma.IntFilter<"Identity"> | number;
    Full_Name?: Prisma.StringFilter<"Identity"> | string;
    Age?: Prisma.IntFilter<"Identity"> | number;
    Adress?: Prisma.StringFilter<"Identity"> | string;
    Created_at?: Prisma.DateTimeFilter<"Identity"> | Date | string;
    Updated_at?: Prisma.DateTimeFilter<"Identity"> | Date | string;
    User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type IdentityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    User_Id?: Prisma.SortOrder;
    Full_Name?: Prisma.SortOrder;
    Age?: Prisma.SortOrder;
    Adress?: Prisma.SortOrder;
    Created_at?: Prisma.SortOrder;
    Updated_at?: Prisma.SortOrder;
    User?: Prisma.UserOrderByWithRelationInput;
};
export type IdentityWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    Full_Name?: string;
    AND?: Prisma.IdentityWhereInput | Prisma.IdentityWhereInput[];
    OR?: Prisma.IdentityWhereInput[];
    NOT?: Prisma.IdentityWhereInput | Prisma.IdentityWhereInput[];
    User_Id?: Prisma.IntFilter<"Identity"> | number;
    Age?: Prisma.IntFilter<"Identity"> | number;
    Adress?: Prisma.StringFilter<"Identity"> | string;
    Created_at?: Prisma.DateTimeFilter<"Identity"> | Date | string;
    Updated_at?: Prisma.DateTimeFilter<"Identity"> | Date | string;
    User?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "Full_Name">;
export type IdentityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    User_Id?: Prisma.SortOrder;
    Full_Name?: Prisma.SortOrder;
    Age?: Prisma.SortOrder;
    Adress?: Prisma.SortOrder;
    Created_at?: Prisma.SortOrder;
    Updated_at?: Prisma.SortOrder;
    _count?: Prisma.IdentityCountOrderByAggregateInput;
    _avg?: Prisma.IdentityAvgOrderByAggregateInput;
    _max?: Prisma.IdentityMaxOrderByAggregateInput;
    _min?: Prisma.IdentityMinOrderByAggregateInput;
    _sum?: Prisma.IdentitySumOrderByAggregateInput;
};
export type IdentityScalarWhereWithAggregatesInput = {
    AND?: Prisma.IdentityScalarWhereWithAggregatesInput | Prisma.IdentityScalarWhereWithAggregatesInput[];
    OR?: Prisma.IdentityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.IdentityScalarWhereWithAggregatesInput | Prisma.IdentityScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"Identity"> | number;
    User_Id?: Prisma.IntWithAggregatesFilter<"Identity"> | number;
    Full_Name?: Prisma.StringWithAggregatesFilter<"Identity"> | string;
    Age?: Prisma.IntWithAggregatesFilter<"Identity"> | number;
    Adress?: Prisma.StringWithAggregatesFilter<"Identity"> | string;
    Created_at?: Prisma.DateTimeWithAggregatesFilter<"Identity"> | Date | string;
    Updated_at?: Prisma.DateTimeWithAggregatesFilter<"Identity"> | Date | string;
};
export type IdentityCreateInput = {
    Full_Name: string;
    Age: number;
    Adress: string;
    Created_at?: Date | string;
    Updated_at?: Date | string;
    User: Prisma.UserCreateNestedOneWithoutIdentitiesInput;
};
export type IdentityUncheckedCreateInput = {
    id?: number;
    User_Id: number;
    Full_Name: string;
    Age: number;
    Adress: string;
    Created_at?: Date | string;
    Updated_at?: Date | string;
};
export type IdentityUpdateInput = {
    Full_Name?: Prisma.StringFieldUpdateOperationsInput | string;
    Age?: Prisma.IntFieldUpdateOperationsInput | number;
    Adress?: Prisma.StringFieldUpdateOperationsInput | string;
    Created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    User?: Prisma.UserUpdateOneRequiredWithoutIdentitiesNestedInput;
};
export type IdentityUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    User_Id?: Prisma.IntFieldUpdateOperationsInput | number;
    Full_Name?: Prisma.StringFieldUpdateOperationsInput | string;
    Age?: Prisma.IntFieldUpdateOperationsInput | number;
    Adress?: Prisma.StringFieldUpdateOperationsInput | string;
    Created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityCreateManyInput = {
    id?: number;
    User_Id: number;
    Full_Name: string;
    Age: number;
    Adress: string;
    Created_at?: Date | string;
    Updated_at?: Date | string;
};
export type IdentityUpdateManyMutationInput = {
    Full_Name?: Prisma.StringFieldUpdateOperationsInput | string;
    Age?: Prisma.IntFieldUpdateOperationsInput | number;
    Adress?: Prisma.StringFieldUpdateOperationsInput | string;
    Created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    User_Id?: Prisma.IntFieldUpdateOperationsInput | number;
    Full_Name?: Prisma.StringFieldUpdateOperationsInput | string;
    Age?: Prisma.IntFieldUpdateOperationsInput | number;
    Adress?: Prisma.StringFieldUpdateOperationsInput | string;
    Created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityListRelationFilter = {
    every?: Prisma.IdentityWhereInput;
    some?: Prisma.IdentityWhereInput;
    none?: Prisma.IdentityWhereInput;
};
export type IdentityOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type IdentityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    User_Id?: Prisma.SortOrder;
    Full_Name?: Prisma.SortOrder;
    Age?: Prisma.SortOrder;
    Adress?: Prisma.SortOrder;
    Created_at?: Prisma.SortOrder;
    Updated_at?: Prisma.SortOrder;
};
export type IdentityAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    User_Id?: Prisma.SortOrder;
    Age?: Prisma.SortOrder;
};
export type IdentityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    User_Id?: Prisma.SortOrder;
    Full_Name?: Prisma.SortOrder;
    Age?: Prisma.SortOrder;
    Adress?: Prisma.SortOrder;
    Created_at?: Prisma.SortOrder;
    Updated_at?: Prisma.SortOrder;
};
export type IdentityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    User_Id?: Prisma.SortOrder;
    Full_Name?: Prisma.SortOrder;
    Age?: Prisma.SortOrder;
    Adress?: Prisma.SortOrder;
    Created_at?: Prisma.SortOrder;
    Updated_at?: Prisma.SortOrder;
};
export type IdentitySumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    User_Id?: Prisma.SortOrder;
    Age?: Prisma.SortOrder;
};
export type IdentityCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentityCreateWithoutUserInput, Prisma.IdentityUncheckedCreateWithoutUserInput> | Prisma.IdentityCreateWithoutUserInput[] | Prisma.IdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityCreateOrConnectWithoutUserInput | Prisma.IdentityCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.IdentityCreateManyUserInputEnvelope;
    connect?: Prisma.IdentityWhereUniqueInput | Prisma.IdentityWhereUniqueInput[];
};
export type IdentityUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.IdentityCreateWithoutUserInput, Prisma.IdentityUncheckedCreateWithoutUserInput> | Prisma.IdentityCreateWithoutUserInput[] | Prisma.IdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityCreateOrConnectWithoutUserInput | Prisma.IdentityCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.IdentityCreateManyUserInputEnvelope;
    connect?: Prisma.IdentityWhereUniqueInput | Prisma.IdentityWhereUniqueInput[];
};
export type IdentityUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityCreateWithoutUserInput, Prisma.IdentityUncheckedCreateWithoutUserInput> | Prisma.IdentityCreateWithoutUserInput[] | Prisma.IdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityCreateOrConnectWithoutUserInput | Prisma.IdentityCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.IdentityUpsertWithWhereUniqueWithoutUserInput | Prisma.IdentityUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.IdentityCreateManyUserInputEnvelope;
    set?: Prisma.IdentityWhereUniqueInput | Prisma.IdentityWhereUniqueInput[];
    disconnect?: Prisma.IdentityWhereUniqueInput | Prisma.IdentityWhereUniqueInput[];
    delete?: Prisma.IdentityWhereUniqueInput | Prisma.IdentityWhereUniqueInput[];
    connect?: Prisma.IdentityWhereUniqueInput | Prisma.IdentityWhereUniqueInput[];
    update?: Prisma.IdentityUpdateWithWhereUniqueWithoutUserInput | Prisma.IdentityUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.IdentityUpdateManyWithWhereWithoutUserInput | Prisma.IdentityUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.IdentityScalarWhereInput | Prisma.IdentityScalarWhereInput[];
};
export type IdentityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.IdentityCreateWithoutUserInput, Prisma.IdentityUncheckedCreateWithoutUserInput> | Prisma.IdentityCreateWithoutUserInput[] | Prisma.IdentityUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.IdentityCreateOrConnectWithoutUserInput | Prisma.IdentityCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.IdentityUpsertWithWhereUniqueWithoutUserInput | Prisma.IdentityUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.IdentityCreateManyUserInputEnvelope;
    set?: Prisma.IdentityWhereUniqueInput | Prisma.IdentityWhereUniqueInput[];
    disconnect?: Prisma.IdentityWhereUniqueInput | Prisma.IdentityWhereUniqueInput[];
    delete?: Prisma.IdentityWhereUniqueInput | Prisma.IdentityWhereUniqueInput[];
    connect?: Prisma.IdentityWhereUniqueInput | Prisma.IdentityWhereUniqueInput[];
    update?: Prisma.IdentityUpdateWithWhereUniqueWithoutUserInput | Prisma.IdentityUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.IdentityUpdateManyWithWhereWithoutUserInput | Prisma.IdentityUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.IdentityScalarWhereInput | Prisma.IdentityScalarWhereInput[];
};
export type IdentityCreateWithoutUserInput = {
    Full_Name: string;
    Age: number;
    Adress: string;
    Created_at?: Date | string;
    Updated_at?: Date | string;
};
export type IdentityUncheckedCreateWithoutUserInput = {
    id?: number;
    Full_Name: string;
    Age: number;
    Adress: string;
    Created_at?: Date | string;
    Updated_at?: Date | string;
};
export type IdentityCreateOrConnectWithoutUserInput = {
    where: Prisma.IdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityCreateWithoutUserInput, Prisma.IdentityUncheckedCreateWithoutUserInput>;
};
export type IdentityCreateManyUserInputEnvelope = {
    data: Prisma.IdentityCreateManyUserInput | Prisma.IdentityCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type IdentityUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.IdentityWhereUniqueInput;
    update: Prisma.XOR<Prisma.IdentityUpdateWithoutUserInput, Prisma.IdentityUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.IdentityCreateWithoutUserInput, Prisma.IdentityUncheckedCreateWithoutUserInput>;
};
export type IdentityUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.IdentityWhereUniqueInput;
    data: Prisma.XOR<Prisma.IdentityUpdateWithoutUserInput, Prisma.IdentityUncheckedUpdateWithoutUserInput>;
};
export type IdentityUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.IdentityScalarWhereInput;
    data: Prisma.XOR<Prisma.IdentityUpdateManyMutationInput, Prisma.IdentityUncheckedUpdateManyWithoutUserInput>;
};
export type IdentityScalarWhereInput = {
    AND?: Prisma.IdentityScalarWhereInput | Prisma.IdentityScalarWhereInput[];
    OR?: Prisma.IdentityScalarWhereInput[];
    NOT?: Prisma.IdentityScalarWhereInput | Prisma.IdentityScalarWhereInput[];
    id?: Prisma.IntFilter<"Identity"> | number;
    User_Id?: Prisma.IntFilter<"Identity"> | number;
    Full_Name?: Prisma.StringFilter<"Identity"> | string;
    Age?: Prisma.IntFilter<"Identity"> | number;
    Adress?: Prisma.StringFilter<"Identity"> | string;
    Created_at?: Prisma.DateTimeFilter<"Identity"> | Date | string;
    Updated_at?: Prisma.DateTimeFilter<"Identity"> | Date | string;
};
export type IdentityCreateManyUserInput = {
    id?: number;
    Full_Name: string;
    Age: number;
    Adress: string;
    Created_at?: Date | string;
    Updated_at?: Date | string;
};
export type IdentityUpdateWithoutUserInput = {
    Full_Name?: Prisma.StringFieldUpdateOperationsInput | string;
    Age?: Prisma.IntFieldUpdateOperationsInput | number;
    Adress?: Prisma.StringFieldUpdateOperationsInput | string;
    Created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityUncheckedUpdateWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    Full_Name?: Prisma.StringFieldUpdateOperationsInput | string;
    Age?: Prisma.IntFieldUpdateOperationsInput | number;
    Adress?: Prisma.StringFieldUpdateOperationsInput | string;
    Created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentityUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    Full_Name?: Prisma.StringFieldUpdateOperationsInput | string;
    Age?: Prisma.IntFieldUpdateOperationsInput | number;
    Adress?: Prisma.StringFieldUpdateOperationsInput | string;
    Created_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Updated_at?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type IdentitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    User_Id?: boolean;
    Full_Name?: boolean;
    Age?: boolean;
    Adress?: boolean;
    Created_at?: boolean;
    Updated_at?: boolean;
    User?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identity"]>;
export type IdentitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    User_Id?: boolean;
    Full_Name?: boolean;
    Age?: boolean;
    Adress?: boolean;
    Created_at?: boolean;
    Updated_at?: boolean;
    User?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identity"]>;
export type IdentitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    User_Id?: boolean;
    Full_Name?: boolean;
    Age?: boolean;
    Adress?: boolean;
    Created_at?: boolean;
    Updated_at?: boolean;
    User?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["identity"]>;
export type IdentitySelectScalar = {
    id?: boolean;
    User_Id?: boolean;
    Full_Name?: boolean;
    Age?: boolean;
    Adress?: boolean;
    Created_at?: boolean;
    Updated_at?: boolean;
};
export type IdentityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "User_Id" | "Full_Name" | "Age" | "Adress" | "Created_at" | "Updated_at", ExtArgs["result"]["identity"]>;
export type IdentityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    User?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IdentityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    User?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type IdentityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    User?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $IdentityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Identity";
    objects: {
        User: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        User_Id: number;
        Full_Name: string;
        Age: number;
        Adress: string;
        Created_at: Date;
        Updated_at: Date;
    }, ExtArgs["result"]["identity"]>;
    composites: {};
};
export type IdentityGetPayload<S extends boolean | null | undefined | IdentityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$IdentityPayload, S>;
export type IdentityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<IdentityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: IdentityCountAggregateInputType | true;
};
export interface IdentityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Identity'];
        meta: {
            name: 'Identity';
        };
    };
    findUnique<T extends IdentityFindUniqueArgs>(args: Prisma.SelectSubset<T, IdentityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__IdentityClient<runtime.Types.Result.GetResult<Prisma.$IdentityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends IdentityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, IdentityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityClient<runtime.Types.Result.GetResult<Prisma.$IdentityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends IdentityFindFirstArgs>(args?: Prisma.SelectSubset<T, IdentityFindFirstArgs<ExtArgs>>): Prisma.Prisma__IdentityClient<runtime.Types.Result.GetResult<Prisma.$IdentityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends IdentityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, IdentityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__IdentityClient<runtime.Types.Result.GetResult<Prisma.$IdentityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends IdentityFindManyArgs>(args?: Prisma.SelectSubset<T, IdentityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends IdentityCreateArgs>(args: Prisma.SelectSubset<T, IdentityCreateArgs<ExtArgs>>): Prisma.Prisma__IdentityClient<runtime.Types.Result.GetResult<Prisma.$IdentityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends IdentityCreateManyArgs>(args?: Prisma.SelectSubset<T, IdentityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends IdentityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, IdentityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends IdentityDeleteArgs>(args: Prisma.SelectSubset<T, IdentityDeleteArgs<ExtArgs>>): Prisma.Prisma__IdentityClient<runtime.Types.Result.GetResult<Prisma.$IdentityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends IdentityUpdateArgs>(args: Prisma.SelectSubset<T, IdentityUpdateArgs<ExtArgs>>): Prisma.Prisma__IdentityClient<runtime.Types.Result.GetResult<Prisma.$IdentityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends IdentityDeleteManyArgs>(args?: Prisma.SelectSubset<T, IdentityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends IdentityUpdateManyArgs>(args: Prisma.SelectSubset<T, IdentityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends IdentityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, IdentityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$IdentityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends IdentityUpsertArgs>(args: Prisma.SelectSubset<T, IdentityUpsertArgs<ExtArgs>>): Prisma.Prisma__IdentityClient<runtime.Types.Result.GetResult<Prisma.$IdentityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends IdentityCountArgs>(args?: Prisma.Subset<T, IdentityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], IdentityCountAggregateOutputType> : number>;
    aggregate<T extends IdentityAggregateArgs>(args: Prisma.Subset<T, IdentityAggregateArgs>): Prisma.PrismaPromise<GetIdentityAggregateType<T>>;
    groupBy<T extends IdentityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: IdentityGroupByArgs['orderBy'];
    } : {
        orderBy?: IdentityGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, IdentityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIdentityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: IdentityFieldRefs;
}
export interface Prisma__IdentityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    User<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface IdentityFieldRefs {
    readonly id: Prisma.FieldRef<"Identity", 'Int'>;
    readonly User_Id: Prisma.FieldRef<"Identity", 'Int'>;
    readonly Full_Name: Prisma.FieldRef<"Identity", 'String'>;
    readonly Age: Prisma.FieldRef<"Identity", 'Int'>;
    readonly Adress: Prisma.FieldRef<"Identity", 'String'>;
    readonly Created_at: Prisma.FieldRef<"Identity", 'DateTime'>;
    readonly Updated_at: Prisma.FieldRef<"Identity", 'DateTime'>;
}
export type IdentityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelect<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    include?: Prisma.IdentityInclude<ExtArgs> | null;
    where: Prisma.IdentityWhereUniqueInput;
};
export type IdentityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelect<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    include?: Prisma.IdentityInclude<ExtArgs> | null;
    where: Prisma.IdentityWhereUniqueInput;
};
export type IdentityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelect<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    include?: Prisma.IdentityInclude<ExtArgs> | null;
    where?: Prisma.IdentityWhereInput;
    orderBy?: Prisma.IdentityOrderByWithRelationInput | Prisma.IdentityOrderByWithRelationInput[];
    cursor?: Prisma.IdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityScalarFieldEnum | Prisma.IdentityScalarFieldEnum[];
};
export type IdentityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelect<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    include?: Prisma.IdentityInclude<ExtArgs> | null;
    where?: Prisma.IdentityWhereInput;
    orderBy?: Prisma.IdentityOrderByWithRelationInput | Prisma.IdentityOrderByWithRelationInput[];
    cursor?: Prisma.IdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityScalarFieldEnum | Prisma.IdentityScalarFieldEnum[];
};
export type IdentityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelect<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    include?: Prisma.IdentityInclude<ExtArgs> | null;
    where?: Prisma.IdentityWhereInput;
    orderBy?: Prisma.IdentityOrderByWithRelationInput | Prisma.IdentityOrderByWithRelationInput[];
    cursor?: Prisma.IdentityWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.IdentityScalarFieldEnum | Prisma.IdentityScalarFieldEnum[];
};
export type IdentityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelect<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    include?: Prisma.IdentityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityCreateInput, Prisma.IdentityUncheckedCreateInput>;
};
export type IdentityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.IdentityCreateManyInput | Prisma.IdentityCreateManyInput[];
    skipDuplicates?: boolean;
};
export type IdentityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    data: Prisma.IdentityCreateManyInput | Prisma.IdentityCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.IdentityIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type IdentityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelect<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    include?: Prisma.IdentityInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityUpdateInput, Prisma.IdentityUncheckedUpdateInput>;
    where: Prisma.IdentityWhereUniqueInput;
};
export type IdentityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.IdentityUpdateManyMutationInput, Prisma.IdentityUncheckedUpdateManyInput>;
    where?: Prisma.IdentityWhereInput;
    limit?: number;
};
export type IdentityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.IdentityUpdateManyMutationInput, Prisma.IdentityUncheckedUpdateManyInput>;
    where?: Prisma.IdentityWhereInput;
    limit?: number;
    include?: Prisma.IdentityIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type IdentityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelect<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    include?: Prisma.IdentityInclude<ExtArgs> | null;
    where: Prisma.IdentityWhereUniqueInput;
    create: Prisma.XOR<Prisma.IdentityCreateInput, Prisma.IdentityUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.IdentityUpdateInput, Prisma.IdentityUncheckedUpdateInput>;
};
export type IdentityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelect<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    include?: Prisma.IdentityInclude<ExtArgs> | null;
    where: Prisma.IdentityWhereUniqueInput;
};
export type IdentityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.IdentityWhereInput;
    limit?: number;
};
export type IdentityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.IdentitySelect<ExtArgs> | null;
    omit?: Prisma.IdentityOmit<ExtArgs> | null;
    include?: Prisma.IdentityInclude<ExtArgs> | null;
};

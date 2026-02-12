import { makeRapiniMutation } from "../../src/react-query/rapini-mutation";
import { compile } from "../test.utils";

const expected = `function useRapiniMutation<TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(mutationFn: MutationFunction<TData, TVariables>, config?: (queryClient: QueryClient) => Pick<UseMutationOptions<TData, TError, TVariables, TContext>, "onSuccess" | "onSettled" | "onError">, options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">): UseMutationResult<TData, TError, TVariables, TContext> {
    const { onSuccess, onError, onSettled, ...rest } = options ?? {};
    const queryClient = useQueryClient();
    const conf = config?.(queryClient);
    const mutationOptions: typeof options = {
        onSuccess: (data: TData, variables: TVariables, onMutateResult: TContext | undefined, context: any) => {
            const ctx = onMutateResult as TContext;
            conf?.onSuccess?.(data, variables, ctx, context);
            onSuccess?.(data, variables, ctx, context);
        },
        onError: (error: TError, variables: TVariables, onMutateResult: TContext | undefined, context: any) => {
            const ctx = onMutateResult as TContext;
            conf?.onError?.(error, variables, ctx, context);
            onError?.(error, variables, ctx, context);
        },
        onSettled: (data: TData | undefined, error: TError | null, variables: TVariables, onMutateResult: TContext | undefined, context: any) => {
            const ctx = onMutateResult as TContext;
            conf?.onSettled?.(data, error, variables, ctx, context);
            onSettled?.(data, error, variables, ctx, context);
        },
        ...rest
    };
    return useMutation({ mutationFn, ...mutationOptions });
}
`;

describe("makeInitialize", () => {
  it("generates the correct rapinin mutation function", () => {
    const str = compile([makeRapiniMutation()]);
    expect(str).toBe(expected);
  });
});

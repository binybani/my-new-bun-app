import { Hono } from "hono";
import{ z } from "zod";//data가 유효한지 검증하기 위해 사용

type Expense = {
  id: number,
  title: string,
  amount: number,
}

const fakeExpenses: Expense[] = [
  {
    id: 1,
    title: "Groceries",
    amount: 50
  },
  {
    id: 2,
    title: "Utilities",
    amount: 100,
  },
  {
    id: 3,
    title: "Rent",
    amount: 1000,
  },
];

const createPostSchema = z.object({
  title: z.string(),
  amount: z.number(),
})

export const expensesRoute = new Hono()
.get("/", async (c) => {
  // josn 형식으로 응답을 반환
  return c.json({ expenses: fakeExpenses });
})

.post("/", async (c) => {
  const data = await c.req.json()
  const expense = createPostSchema.parse(data);
  console.log(expense.amount);
  console.log({expense});
  // c.req.json()을 이용해서 요청 본문을 파싱, 그값을 사용
  return c.json(expense);
});
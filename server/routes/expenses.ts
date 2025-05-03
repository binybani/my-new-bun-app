import { Hono } from "hono";// Hono는 bun을 위한 경량의 web framework
// Hono는 빠르고 가벼운 웹 프레임워크로, TypeScript와 함께 사용하기에 적합
import{ z } from "zod";//data가 유효한지 검증하기 위해 사용
import { zValidator } from '@hono/zod-validator'

// type Expense = {
//   id: number,
//   title: string,
//   amount: number,
// }

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive(),
})

type Expense = z.infer<typeof expenseSchema>;
// zod를 사용하여 expenseSchema를 정의

// zod를 사용하여 데이터 검증을 위한 스키마 정의
// zod는 TypeScript와 함께 사용할 수 있는 데이터 검증 라이브러리
const createPostSchema = expenseSchema.omit({id: true})

// fake 데이터베이스 역할을 하는 배열
// 실제 데이터베이스를 사용하지 않고, 메모리에서 데이터를 관리
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

export const expensesRoute = new Hono()
.get("/", async (c) => {
  // josn 형식으로 응답을 반환
  return c.json({ expenses: fakeExpenses });
})

.post("/", zValidator("json", createPostSchema), async (c) => {
  const expense = await c.req.valid("json");
  fakeExpenses.push({...expense, id: fakeExpenses.length + 1});
  c.status(201);
  return c.json(expense);
})

.get("/:id{[0-9]+}", (c) => {
  const id = Number.parseInt(c.req.param("id"));
  const expense = fakeExpenses.find(expense => expense.id === id);
  if (!expense) {
    return c.notFound();
  }
  return c.json(expense);
})

.delete("/:id{[0-9]+}", (c) => {
  const id = Number.parseInt(c.req.param("id"));
  const index = fakeExpenses.findIndex(expense => expense.id === id);
  if (index === -1) {
    return c.notFound();
  }
  const deleteExpenxe = fakeExpenses.splice(index, 1)[0]; // Remove the expense from the array
  return c.json({ expense: deleteExpenxe });
});

// .put
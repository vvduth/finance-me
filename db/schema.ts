import { integer, pgTable ,timestamp, text} from "drizzle-orm/pg-core";
import { createInsertSchema} from "drizzle-zod"
import { relations } from "drizzle-orm";
import {z}from "zod"

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
})

export const accountsRelations = relations(accounts,({many}) =>({
    // one account can have many transactions
    transactions: many(transactions),
}) )
export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable("categories", {
    id: text("id").primaryKey(),
    plaidId: text("plaid_id"),
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
})
export const categoriesRelations = relations(accounts,({many}) =>({
    // one account can have many transactions inside
    transactions: many(transactions),
}) )
export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable("transactions", {
    id: text("id").primaryKey(),
    amount:integer("amount").notNull(),
    payee: text("payee").notNull(),
    notes: text("notes"), 
    date: timestamp("date", {mode: "date"}).notNull(),
    accountId: text("account_id").references(() => accounts.id,{
        onDelete: "cascade",
    }).notNull(),
    categoryId: text("category_id").references(() => categories.id, {
        onDelete: "set null"
    }) 
})

export const transactionsRelations = relations(transactions, ({one}) =>({
    // one transaction can only belong to one account
    account: one(accounts, {
        fields: [transactions.accountId],
        references: [accounts.id]
    }),
    categories: one(categories, {
        fields: [transactions.categoryId],
        references: [categories.id]
    })
}))

export const insertTransactionSchema = createInsertSchema(transactions,
    {
        date: z.coerce.date()
    }
)
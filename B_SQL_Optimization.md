# 📊 Part B – SQL Improvement Logic Test

## ⏱ Time Spent
~1.5 hours

---

## 🔍 Problem Summary

The original SQL query is slow (~8 seconds) due to multiple performance issues:

### Identified Bottlenecks

1. **Excessive LEFT JOINs**
   - Many joined tables may not contribute to the result.
   - Each join increases processing time and memory usage.

2. **Use of `LIKE '%keyword%'`**
   - Prevents index usage and causes full table scans.
   - Applied across multiple text fields and joined tables.

3. **GROUP BY Without Aggregation**
   - Adds unnecessary overhead without using aggregation functions.

4. **Pagination Using OFFSET**
   - OFFSET slows down significantly on large datasets.

---

## ✅ Suggested Improvements

### 1. Replace `LIKE` with `FULLTEXT` Search

Instead of:
```sql
Jobs.name LIKE '%キャビンアテンダント%'
```

Use:
```sql
MATCH(Jobs.name, Jobs.description, Jobs.detail)
AGAINST('キャビンアテンダント' IN NATURAL LANGUAGE MODE)
```

**Add Fulltext Indexes:**
```sql
ALTER TABLE Jobs ADD FULLTEXT(name, description, detail);
ALTER TABLE JobTypes ADD FULLTEXT(name);
ALTER TABLE Personalities ADD FULLTEXT(name);
-- Repeat for other relevant tables
```

---

### 2. Reduce Unused Joins

Only keep `JOIN`s where:
- You are using fields in `SELECT`, `WHERE`, or `ORDER BY`.
- You have to retrieve related data.

This will significantly reduce execution complexity.

---

### 3. Use Composite Indexes

Create indexes for common filters:
```sql
CREATE INDEX idx_jobs_status_deleted ON Jobs(publish_status, deleted);
CREATE INDEX idx_jobs_cat_type ON Jobs(job_category_id, job_type_id);
```

Also index foreign keys used in joins:
```sql
CREATE INDEX idx_jobs_personality_id ON jobs_personalities(job_id, personality_id);
-- Repeat for similar join tables
```

---

### 4. Filter First, Then Join

Use a **Common Table Expression (CTE)** or subquery to filter `Jobs` early:

```sql
WITH FilteredJobs AS (
  SELECT id
  FROM Jobs
  WHERE MATCH(name, description, detail)
        AGAINST('キャビンアテンダント' IN NATURAL LANGUAGE MODE)
    AND publish_status = 1
    AND deleted IS NULL
  ORDER BY sort_order DESC, id DESC
  LIMIT 50
)
SELECT J.*, JT.name AS job_type_name, ...
FROM FilteredJobs FJ
JOIN Jobs J ON J.id = FJ.id
LEFT JOIN JobTypes JT ON JT.id = J.job_type_id
-- other necessary joins
```

---

### 5. Use Keyset Pagination (Seek Method)

Instead of:
```sql
LIMIT 50 OFFSET 1000
```

Use:
```sql
WHERE Jobs.id < :last_seen_id
ORDER BY Jobs.id DESC
LIMIT 50
```

This prevents the database from scanning and skipping thousands of rows.

---

### 6. Remove Redundant `GROUP BY`

If you're not aggregating (no `SUM`, `COUNT`, etc.), you don't need:

```sql
GROUP BY Jobs.id
```

It only slows the query down if each `Jobs.id` is already unique.

---

## 🛠 Tools You Can Use

- `EXPLAIN` or `EXPLAIN ANALYZE` to inspect query plans.
- Use a query profiler or slow query log for MySQL.
- Benchmark before/after times to show improvements.

---

## 🧾 Summary Table

| Issue                        | Fix                                                  |
|-----------------------------|-------------------------------------------------------|
| Full table scans            | Use `FULLTEXT` search indexes                        |
| Too many joins              | Remove joins that are unused in SELECT or WHERE      |
| Slow pagination             | Use keyset pagination (seek method)                  |
| Missing indexes             | Add composite and foreign key indexes                |
| Unnecessary GROUP BY        | Remove if no aggregation is needed                   |

---

## 📝 Final Note

By implementing the above changes, the query execution time should decrease significantly (often to under 1 second), depending on dataset size and indexing efficiency. For high-traffic systems, caching and background search indexing may be further explored.

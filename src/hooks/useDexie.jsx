import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../db/db";

const useDexie = (table, filterFn = null) => {
  const [manualResults, setManualResults] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const results =
    useLiveQuery(() => {
      if (filterFn) {
        return db[table].filter(filterFn).toArray();
      }
      return db[table].toArray();
    }, [table]) ?? [];

  const getAll = async () => {
    setIsPending(true);
    setError(null);
    try {
      let data;
      if (filterFn) {
        data = await db[table].filter(filterFn).toArray();
      } else {
        data = await db[table].toArray();
      }
      setManualResults(data);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  const add = async (data) => {
    setIsPending(true);
    setError(null);
    try {
      await db[table].add({
        ...data,
        createdAt: new Date().toISOString(),
      });
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  const update = async (id, data) => {
    setIsPending(true);
    setError(null);
    try {
      await db[table].update(id, data);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  const deleteItem = async (id) => {
    setIsPending(true);
    setError(null);
    try {
      await db[table].delete(id);
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  const clearAll = async () => {
    setIsPending(true);
    setError(null);
    try {
      await db[table].clear();
      setIsPending(false);
    } catch (err) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return {
    manualResults,
    results,
    isPending,
    error,
    getAll,
    add,
    update,
    deleteItem,
    clearAll,
  };
};

export default useDexie;
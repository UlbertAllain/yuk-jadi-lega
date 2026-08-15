"use client";

import { useCallback, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

const READ_ERROR = "Gagal membaca data. Periksa koneksi dan hak akses admin.";
const WRITE_ERROR = "Perubahan belum berhasil disimpan. Silakan coba lagi.";

export function useAdminCollection<T extends { id: string }>(collectionName: string) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(Boolean(db));
  const [error, setError] = useState(db ? "" : "Database belum tersedia.");

  const refresh = useCallback(async () => {
    if (!db) {
      setLoading(false);
      setError("Database belum tersedia.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const snapshot = await getDocs(collection(db, collectionName));
      setItems(
        snapshot.docs.map(
          (item) => ({ ...item.data(), id: item.id }) as T,
        ),
      );
    } catch (err) {
      console.error(err);
      setError(READ_ERROR);
    } finally {
      setLoading(false);
    }
  }, [collectionName]);

  useEffect(() => {
    if (!db) return;

    let active = true;

    getDocs(collection(db, collectionName))
      .then((snapshot) => {
        if (!active) return;

        setItems(
          snapshot.docs.map(
            (item) => ({ ...item.data(), id: item.id }) as T,
          ),
        );
        setError("");
      })
      .catch((err) => {
        console.error(err);
        if (active) setError(READ_ERROR);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [collectionName]);

  async function save(id: string, data: Omit<Partial<T>, "id">) {
    if (!db) {
      setError("Database belum tersedia.");
      return false;
    }

    setError("");

    try {
      await setDoc(
        doc(db, collectionName, id),
        { ...data, updatedAt: serverTimestamp() },
        { merge: true },
      );
      await refresh();
      return true;
    } catch (err) {
      console.error(err);
      setError(WRITE_ERROR);
      return false;
    }
  }

  async function remove(id: string) {
    if (!db) {
      setError("Database belum tersedia.");
      return false;
    }

    setError("");

    try {
      await deleteDoc(doc(db, collectionName, id));
      await refresh();
      return true;
    } catch (err) {
      console.error(err);
      setError(WRITE_ERROR);
      return false;
    }
  }

  return { items, loading, error, refresh, save, remove };
}

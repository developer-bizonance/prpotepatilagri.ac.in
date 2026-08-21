"use client";

export const dynamic = "force-dynamic";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/announcements/${id}`
        );
        const data = await res.json();
        setCourse(data);
      } catch (err) {
        console.error("Failed to fetch course data", err);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

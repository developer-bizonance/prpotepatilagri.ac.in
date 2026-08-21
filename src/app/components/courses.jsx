"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BookText,
  ClipboardList,
  UserCheck,
  BarChart2,
  Award,
  CalendarCheck,
  CheckCircle,
  BookOpen,
  GraduationCap,
  Library,
  Monitor,
  Smartphone,
} from "lucide-react";

const icons = {
  BookText,
  ClipboardList,
  UserCheck,
  BarChart2,
  Award,
  CalendarCheck,
  CheckCircle,
  BookOpen,
  GraduationCap,
  Library,
  Monitor,
  Smartphone,
};

export default function CoursesSection() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/courses"
        );
        const data = await res.json();

        const highlightedCourses = [...data]
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .filter((course) => course.highlight)
          .slice(0, 3);

        setCourses(highlightedCourses);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

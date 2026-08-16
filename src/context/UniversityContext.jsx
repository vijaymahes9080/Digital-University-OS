import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  initialUsers,
  initialCourses,
  initialAttendance,
  initialProjects,
  initialResearch,
  initialPlacement,
  initialAnalytics
} from '../data/mockUniversityData';
import { ragCorpusDocuments } from '../data/ragCorpus';

const UniversityContext = createContext(null);

export const UniversityProvider = ({ children }) => {
  // Active User Role Switcher ('student', 'faculty', 'admin')
  const [activeRole, setActiveRole] = useState('student');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Guided Demo Flow state
  const [isDemoActive, setIsDemoActive] = useState(true);
  const [demoStep, setDemoStep] = useState(1);

  // Intelligence Graph Modal visibility state
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);

  // Core Data States
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('univ_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('univ_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [attendanceData, setAttendanceData] = useState(() => {
    const saved = localStorage.getItem('univ_attendance');
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  const [projectsData, setProjectsData] = useState(() => {
    const saved = localStorage.getItem('univ_projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });

  const [researchData, setResearchData] = useState(() => {
    const saved = localStorage.getItem('univ_research');
    return saved ? JSON.parse(saved) : initialResearch;
  });

  const [placementData, setPlacementData] = useState(() => {
    const saved = localStorage.getItem('univ_placement');
    return saved ? JSON.parse(saved) : initialPlacement;
  });

  const [analyticsData, setAnalyticsData] = useState(initialAnalytics);

  // System Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Attendance Warning",
      message: "Network Security (CS8501) is currently at 68%. Attend 4 consecutive classes to reach 75%.",
      type: "warning",
      timestamp: "10 mins ago"
    },
    {
      id: 2,
      title: "Project Review Update",
      message: "Dr. Sarah Vance reviewed Milestone 1 for Digital University OS (Score: 96%).",
      type: "success",
      timestamp: "1 hour ago"
    }
  ]);

  // AI Tutor Messages & RAG State
  const [aiChatHistory, setAiChatHistory] = useState([
    {
      id: "msg-1",
      sender: "ai",
      text: "Hello Alex! I am your University OS AI Tutor. I have indexed your CS8501 Network Security syllabus, course notes, and academic regulations. How can I assist your study today?",
      citations: [],
      timestamp: "09:00 AM"
    }
  ]);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('univ_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('univ_attendance', JSON.stringify(attendanceData));
  }, [attendanceData]);

  useEffect(() => {
    localStorage.setItem('univ_projects', JSON.stringify(projectsData));
  }, [projectsData]);

  useEffect(() => {
    localStorage.setItem('univ_placement', JSON.stringify(placementData));
  }, [placementData]);

  // Trigger celebration confetti
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log("Confetti trigger", e);
    }
  };

  // Helper notification adder
  const addNotification = (title, message, type = "info") => {
    setNotifications(prev => [
      {
        id: Date.now(),
        title,
        message,
        type,
        timestamp: "Just now"
      },
      ...prev
    ]);
  };

  // Role Switcher
  const switchRole = (newRole) => {
    setActiveRole(newRole);
    addNotification("Role Switched", `Active view changed to ${newRole.toUpperCase()} mode.`, "info");
  };

  // Action: Mark Attendance & Trigger Cross-Module Update
  const markAttendance = (courseId, status = "Present") => {
    setAttendanceData(prev => {
      return prev.map(item => {
        if (item.courseId === courseId) {
          const newAttended = status === "Present" ? item.attendedClasses + 1 : item.attendedClasses;
          const newTotal = item.totalClasses + 1;
          const newPct = parseFloat(((newAttended / newTotal) * 100).toFixed(1));
          
          let newStatus = "SAFE";
          let classesNeeded = 0;
          if (newPct < 75.0) {
            newStatus = "HIGH RISK";
            const calc = Math.ceil((0.75 * newTotal - newAttended) / 0.25);
            classesNeeded = calc > 0 ? calc : 1;
          } else if (newPct >= 85.0) {
            newStatus = "EXCELLENT";
          }

          const actionMsg = newStatus === "HIGH RISK"
            ? `Attend next ${classesNeeded} consecutive classes to reach 75.0% threshold.`
            : `On track (${newPct}%). Keep up the good work!`;

          return {
            ...item,
            totalClasses: newTotal,
            attendedClasses: newAttended,
            percentage: newPct,
            status: newStatus,
            classesNeeded,
            recommendedAction: actionMsg,
            recentLog: [
              { date: new Date().toISOString().split('T')[0], status },
              ...item.recentLog.slice(0, 4)
            ]
          };
        }
        return item;
      });
    });

    // Update overall student attendance %
    setTimeout(() => {
      setAttendanceData(latest => {
        const totalAtt = latest.reduce((acc, curr) => acc + curr.attendedClasses, 0);
        const totalCls = latest.reduce((acc, curr) => acc + curr.totalClasses, 0);
        const overall = parseFloat(((totalAtt / totalCls) * 100).toFixed(1));
        setUsers(u => ({
          ...u,
          student: { ...u.student, attendancePct: overall }
        }));
        return latest;
      });
    }, 100);

    addNotification("Attendance Logged", `Marked ${status} for course ${courseId}.`, "success");
  };

  // Action: Update Project Milestone & Trigger Placement Skill Gap Upgrade
  const updateProjectMilestone = (projectId, milestoneId, newStatus, score = 95, feedback = "") => {
    setProjectsData(prev => {
      return prev.map(proj => {
        if (proj.id === projectId) {
          const updatedMilestones = proj.milestones.map(m => {
            if (m.id === milestoneId) {
              return { ...m, status: newStatus, score: score || m.score, feedback: feedback || m.feedback };
            }
            return m;
          });

          const completedCount = updatedMilestones.filter(m => m.status === "Approved").length;
          const progress = Math.round((completedCount / updatedMilestones.length) * 100);

          return {
            ...proj,
            milestones: updatedMilestones,
            progress,
            status: progress === 100 ? "Completed" : "In Progress"
          };
        }
        return proj;
      });
    });

    if (newStatus === "Approved") {
      triggerConfetti();
      addNotification("Milestone Approved!", `Milestone #${milestoneId} for project ${projectId} approved by Faculty.`, "success");

      // Cross-Module Impact: Upgrade Placement Skill Gap & Readiness
      setPlacementData(prev => {
        const updatedRadar = prev.skillRadar.map(item => {
          if (item.skill.includes("Deep Learning") || item.skill.includes("SQL")) {
            return { ...item, current: Math.min(item.current + 30, 95), status: "MET" };
          }
          return item;
        });

        const newReadiness = Math.min(prev.overallReadinessPct + 8, 98);
        return {
          ...prev,
          overallReadinessPct: newReadiness,
          skillRadar: updatedRadar
        };
      });

      setUsers(u => ({
        ...u,
        student: { ...u.student, placementReadiness: Math.min(u.student.placementReadiness + 8, 98) }
      }));
    }
  };

  // Action: AI Tutor Vector RAG Query
  const askAITutor = (query) => {
    const userMsg = {
      id: `msg-usr-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAiChatHistory(prev => [...prev, userMsg]);

    const queryTokens = query.toLowerCase().split(/\s+/);
    let bestMatch = null;
    let maxScore = 0;

    ragCorpusDocuments.forEach(doc => {
      let score = 0;
      doc.keywords.forEach(kw => {
        if (query.toLowerCase().includes(kw)) score += 3;
      });
      queryTokens.forEach(token => {
        if (token.length > 3 && doc.content.toLowerCase().includes(token)) score += 1;
      });

      if (score > maxScore) {
        maxScore = score;
        bestMatch = doc;
      }
    });

    setTimeout(() => {
      let replyText = "";
      let citations = [];

      if (bestMatch && maxScore > 0) {
        citations = [
          {
            docId: bestMatch.id,
            title: bestMatch.title,
            category: bestMatch.category,
            chunkId: bestMatch.chunkId,
            score: Math.min(85 + maxScore * 2, 98)
          }
        ];

        replyText = `Based on the verified university document **[${bestMatch.title}]**:\n\n${bestMatch.content}\n\nWould you like me to generate a 3-question MCQ quiz to test your understanding of this topic?`;
      } else {
        replyText = `I searched your university regulations, syllabus, and project repository for "${query}". While no exact document chunk matched, here is general academic guidance:\n\nFor MCA courses, ensure your coursework aligns with the credit requirements. Please feel free to ask about Network Security Unit 2, RSA algorithm, Attendance policies, or Capstone Project milestones!`;
      }

      const aiResponse = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        text: replyText,
        citations,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setAiChatHistory(prev => [...prev, aiResponse]);
    }, 500);
  };

  // Run Guided MCA Demo Step
  const runDemoStep = (stepNum) => {
    setDemoStep(stepNum);
    switch (stepNum) {
      case 1:
        // Attendance Risk view
        setActiveRole('student');
        setActiveTab('dashboard');
        addNotification("Demo Step 1", "Viewing Student Dashboard with High Attendance Risk Alert in CS8501 (68%).", "warning");
        break;
      case 2:
        // Faculty logs attendance present
        setActiveRole('faculty');
        setActiveTab('attendance');
        addNotification("Demo Step 2", "Faculty view loaded. Log present for CS8501 to restore student attendance eligibility.", "info");
        break;
      case 3:
        // AI Tutor RAG search
        setActiveRole('student');
        setActiveTab('ai_tutor');
        askAITutor("What are the Unit 2 topics in CS8501 Network Security?");
        addNotification("Demo Step 3", "Executing Vector RAG Search on CS8501 Syllabus & Regulations.", "info");
        break;
      case 4:
        // Faculty Milestone approval
        setActiveRole('faculty');
        setActiveTab('projects');
        addNotification("Demo Step 4", "Faculty view: Approve Milestone 3 for Digital University OS capstone.", "info");
        break;
      case 5:
        // Placement Skill Gap sync
        setActiveRole('student');
        setActiveTab('placement');
        addNotification("Demo Step 5", "Placement Career Intelligence Engine: Observe Deep Learning status MET and readiness 84%.", "success");
        break;
      case 6:
        // Intelligence Graph
        setActiveTab('analytics');
        setIsGraphModalOpen(true);
        addNotification("Demo Step 6", "University Intelligence Graph opened. All 8 modules are interconnected!", "success");
        break;
      default:
        break;
    }
  };

  // Reset demo data to baseline
  const resetDemoData = () => {
    localStorage.removeItem('univ_users');
    localStorage.removeItem('univ_attendance');
    localStorage.removeItem('univ_projects');
    localStorage.removeItem('univ_placement');
    setUsers(initialUsers);
    setCourses(initialCourses);
    setAttendanceData(initialAttendance);
    setProjectsData(initialProjects);
    setPlacementData(initialPlacement);
    setDemoStep(1);
    setActiveRole('student');
    setActiveTab('dashboard');
    addNotification("Data Reset", "All university datasets restored to default MCA baseline.", "info");
  };

  const currentUser = users[activeRole];

  return (
    <UniversityContext.Provider
      value={{
        activeRole,
        switchRole,
        activeTab,
        setActiveTab,
        currentUser,
        users,
        courses,
        attendanceData,
        projectsData,
        researchData,
        placementData,
        analyticsData,
        notifications,
        aiChatHistory,
        isDemoActive,
        setIsDemoActive,
        demoStep,
        setDemoStep,
        runDemoStep,
        resetDemoData,
        isGraphModalOpen,
        setIsGraphModalOpen,
        markAttendance,
        updateProjectMilestone,
        askAITutor,
        triggerConfetti,
        addNotification
      }}
    >
      {children}
    </UniversityContext.Provider>
  );
};

export const useUniversity = () => {
  const context = useContext(UniversityContext);
  if (!context) {
    throw new Error("useUniversity must be used within a UniversityProvider");
  }
  return context;
};

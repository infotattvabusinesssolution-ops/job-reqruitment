@echo off
set BASE=d:\job-reqruitment\frontend\src\pages

call :createPage About "About Us" "Learn more about JobRecruitment and our mission to connect talent with opportunity."
call :createPage Services "Our Services" "Comprehensive recruitment and staffing solutions for businesses of all sizes."
call :createPage Industries "Industries" "We serve diverse industries with specialized recruitment expertise."
call :createPage Jobs "Find Jobs" "Browse thousands of job opportunities from top employers."
call :createPage JobDetails "Job Details" "View detailed information about this position."
call :createPage Candidates "For Candidates" "Find your dream job and advance your career."
call :createPage Employers "For Employers" "Hire top talent and build your dream team."
call :createPage Recruiters "For Recruiters" "Powerful tools for recruitment professionals."
call :createPage Blogs "Blog" "Insights, tips, and news from the recruitment world."
call :createPage BlogDetails "Blog Post" "Read our latest blog post."
call :createPage Testimonials "Testimonials" "Hear from our satisfied clients and candidates."
call :createPage FAQ "FAQ" "Frequently asked questions about our platform."
call :createPage Contact "Contact Us" "Get in touch with our team."
call :createPage Register "Create Account" "Join JobRecruitment and start your journey."
call :createPage ForgotPassword "Forgot Password" "Reset your password."
call :createPage ResetPassword "Reset Password" "Set a new password for your account."

md "%BASE%\dashboard" 2>nul
call :createDash CandidateDashboard "Candidate Dashboard" "Manage your job search and applications."
call :createDash EmployerDashboard "Employer Dashboard" "Manage your company and job postings."
call :createDash RecruiterDashboard "Recruiter Dashboard" "Manage your recruitment pipeline."
call :createDash AdminDashboard "Admin Dashboard" "System administration and management."

echo All pages created!
goto :eof

:createPage
set PNAME=%~1
set PTITLE=%~2
set PDESC=%~3
echo Creating %PNAME%.jsx...
>"%BASE%\%PNAME%.jsx" (
echo import React from 'react';
echo import { Helmet } from 'react-helmet-async';
echo.
echo const %PNAME% = () ^{
echo   return (
echo     ^<div className="pt-24 pb-16"^>
echo       ^<Helmet^>
echo         ^<title^>%PTITLE% - JobRecruitment^</title^>
echo         ^<meta name="description" content="%PDESC%" /^>
echo       ^</Helmet^>
echo       ^<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"^>
echo         ^<div className="text-center py-20"^>
echo           ^<h1 className="text-5xl font-heading font-bold text-secondary-900 mb-4"^>%PTITLE%^</h1^>
echo           ^<p className="text-xl text-secondary-600"^>%PDESC%^</p^>
echo         ^</div^>
echo       ^</div^>
echo     ^</div^>
echo   ^);
echo ^};
echo.
echo export default %PNAME%;
)
goto :eof

:createDash
set PNAME=%~1
set PTITLE=%~2
set PDESC=%~3
echo Creating dashboard/%PNAME%.jsx...
>"%BASE%\dashboard\%PNAME%.jsx" (
echo import React from 'react';
echo import { Helmet } from 'react-helmet-async';
echo.
echo const %PNAME% = () ^{
echo   return (
echo     ^<div^>
echo       ^<Helmet^>
echo         ^<title^>%PTITLE% - JobRecruitment^</title^>
echo       ^</Helmet^>
echo       ^<div class="mb-8"^>
echo         ^<h1 className="text-2xl font-heading font-bold text-secondary-900"^>%PTITLE%^</h1^>
echo         ^<p className="text-secondary-500"^>%PDESC%^</p^>
echo       ^</div^>
echo       ^<div className="bg-white rounded-2xl border border-gray-200 p-8"^>
echo         ^<p className="text-secondary-500 text-center py-12"^>Dashboard content coming soon...^</p^>
echo       ^</div^>
echo     ^</div^>
echo   ^);
echo ^};
echo.
echo export default %PNAME%;
)
goto :eof
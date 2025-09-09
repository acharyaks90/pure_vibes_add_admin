@@ .. @@
   useEffect(() => {
     if (!isLoading && !admin) {
-      navigate('/admin/login');
+      navigate('/login');
     } else if (admin && requiredRole.length > 0 && !requiredRole.includes(admin.role)) {
-      navigate('/admin/dashboard');
+      navigate('/dashboard');
     }
   }, [admin, isLoading, navigate, requiredRole]);
@@ .. @@
     const success = await login(email, password);
     if (success) {
-      navigate('/admin/dashboard');
+      navigate('/dashboard');
     } else {
       setError('Invalid credentials. Please try again.');
     }
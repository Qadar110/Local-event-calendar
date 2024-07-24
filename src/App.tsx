import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import { ScheduleComponent, Inject, Agenda, Day, Month, Week, WorkWeek, View } from '@syncfusion/ej2-react-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const App = () => {
  const [currentView, setCurrentView] = useState<View>('Month');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const remoteData = useMemo(() => {
    return new DataManager({
      url: 'https://yourapi.com/events',
      adaptor: new WebApiAdaptor(),
      crossDomain: true
    });
  }, []);

  useEffect(() => {
    const checkForTitle = async () => {
      try {
        const data: any = await remoteData.executeQuery(remoteData.defaultQuery);
        const hasTitle = data.result.some((event: any) => event.Subject);
        if (hasTitle) {
          setCurrentView('Agenda');
        }
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    checkForTitle();
  }, [remoteData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={
            <ScheduleComponent
              currentView={currentView}
              eventSettings={{ dataSource: remoteData }}
              selectedDate={new Date(2024, 5, 5)}
            >
              <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

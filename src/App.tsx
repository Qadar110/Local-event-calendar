import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import { ScheduleComponent, Inject, Agenda, Day, Month, Week, WorkWeek, EventSettingsModel } from '@syncfusion/ej2-react-schedule';
import { DataManager,WebApiAdaptor } from '@syncfusion/ej2-data';
class App extends React.Component {
  private localData: EventSettingsModel = {
    dataSource: [{
      EndTime: new Date(2024, 0, 11, 6, 30),
      StartTime: new Date(2024, 0, 11, 4, 0)
    }]
  };
  private remoteData = new DataManager({
    url: 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData', 
    adaptor: new WebApiAdaptor, 
    crossDomain: true 
  });
 
  
  render() {
    return (
      <ScheduleComponent currentView='Month'
      eventSettings={{ dataSource: this.remoteData }} selectedDate={new Date(2017, 5, 5)} > 
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>  
      
    );
  }
}
   

export default App;
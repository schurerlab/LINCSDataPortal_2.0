import React, { useEffect, useRef, useContext } from 'react'

// import AuthContext from '../context/auth-context'


const SignatureAppliedFilter = (props) => {
 
//   const authContext = useContext(AuthContext);
//   console.log(authContext.authenticated);

    useEffect(() => {
      console.log('[SignatureAppliedFilter.js] useEffect');
    //   toggleBtnRef.current.click();
    //   // Http request...

    //   const timer = setTimeout(() => {
    //     alert('Saved data to cloud!');
    //   }, 1000);

    //   clearTimeout(timer);  //prevent to run it as it's annoying
    // }, [props.persons]);  //all the changes, could be multiple
      return () => {
        console.log('[SignatureAppliedFilter.js] cleanup work in useEffect');
        // clearTimeout(timer); //cancel alert after removing
      }
    }, []);     //only init
    
    // there can be many useEffects
    useEffect(() => {
      console.log('[SignatureAppliedFilter.js] 2nd useEffect');
      return () => {
        console.log('[SignatureAppliedFilter.js] cleanup work in 2nd useEffect');
      }
    });

    // let assignedClasses = []
    // let btnClass = ''

    // if (props.showPersons) {
    //     btnClass = classes.Red
    // }

    // if (props.personsLength <= 2) {
    //   assignedClasses.push(classes.red) //assignedClasses = ['red']
    // }

    // if (props.personsLength <= 1) {
    //   assignedClasses.push(classes.bold) //assignedClasses = ['red', 'bold']
    // }

    function removeTag() {
        console.log("remove tag");
        console.log(props.filterClass, props.filterType, props.filterTerm);;
        
        // console.log(e);
        // console.log(this.state.class, this.state.type, this.state.term);
        props.removeFilter(props.filterClass, props.filterType, props.filterTerm, props.filterIndex);
    }

    return (
        <div key={props.filterIndex}>
            <div className="suggestion-chip" style={{marginLeft:"0.6em"}}>
                {props.filterType}: {props.filterTerm}
                <i className="close" onClick={removeTag}>x</i>
            </div>
        </div>
    )
}

export default SignatureAppliedFilter;



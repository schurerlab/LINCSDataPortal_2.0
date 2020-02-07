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

    function colorTag() {   
        console.log(props.filterClass);
        
        var tagColor="#5f6368"     
        switch (props.filterClass) {
            case "cell line":
                tagColor="rgb(76, 193, 137)"
                break;
            case "small molecule":
                tagColor="darksalmon"
                break;
            case "gene expression":
                tagColor="orange"
                break;
        }

        return { 
            color: tagColor,
            borderColor: tagColor,
            marginLeft:"0.6em",
            padding: "8px"
         } 
    }

    return (
        <div key={props.filterIndex}>
            <div className="suggestion-chip" style={colorTag()}>
                <b>{props.filterType}:</b> {props.filterTerm} &nbsp;&nbsp;
                <span className="close text-right" onClick={removeTag} style={{fontSize: "12px", cursor: "pointer"}}>x</span>
            </div>
        </div>
    )
}

export default SignatureAppliedFilter;



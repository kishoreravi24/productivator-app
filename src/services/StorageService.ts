const KEY = "PDTR_STORE";
export function loadState():any {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    const  storedJSON= JSON.parse(serializedState);
    if(storedJSON.tasks.hasOwnProperty('tasks')){
      const {tasks: {tasks=[]}} = storedJSON;
      return {tasks: {tasksList: tasks}}
    }
    
    return storedJSON;
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}

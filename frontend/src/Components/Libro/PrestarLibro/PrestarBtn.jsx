function PrestarBtn(props){
    return(<div className="prestarBtn">
        <button onClick={props.onClick} personaid={props.personaid}>Prestar</button>
    </div>)
}

export default PrestarBtn
function PrestarBtn(props){
    return(<div className="prestarBtn">
        <button onClick={props.onClick} personaId={props.personaId}>Prestar</button>
    </div>)
}

export default PrestarBtn
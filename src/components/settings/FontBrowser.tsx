import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons';

type FontBrowserProps = {
	text: String;
}

function FontBrowser(props: FontBrowserProps) {
  return (
    <>
			<FontAwesomeIcon icon={faPlay} />
			<label htmlFor="font">{props.text}:</label>
			<select name={`font-${props.text}`} id={`font-${props.text}`}>
				<option value="red">Red</option>
				<option value="green">Green</option>
				<option value="blue">Blue</option>
			</select>
    </>
  );
}

export default FontBrowser;

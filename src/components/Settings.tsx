import ColorPicker from './settings/ColorPicker';
import SizePicker from "./settings/SizePicker";
import AlignPicker from "./settings/AlignPicker";
import TextPicker from './settings/TextPicker';

function Settings() {
  return (
  	<section id="settings">
			<h2>Colors</h2>
			<ColorPicker />
			<ColorPicker />
			<ColorPicker />
			<h2>Sizes</h2>
			<SizePicker />
			<h2>Alignment</h2>
			<AlignPicker />
			<AlignPicker />
			<h2>Text</h2>
			<TextPicker />
    </section>
  );
}

export default Settings;

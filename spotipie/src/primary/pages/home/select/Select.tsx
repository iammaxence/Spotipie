import React, { Dispatch, useEffect, useState } from 'react';
import { Option } from './Option';
import './Select.scss';

interface SelectProps {
  options: Option[],
  selection: Dispatch<React.SetStateAction<Option>>;
}

export function Select({ selection, options }: SelectProps) {

	const [showOptionList, setShowOptionList] = useState<boolean>(false);
	const [defaultOption, setDefaultOption] = useState<Option>(options[0]);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
	}, []);


	function handleClickOutside(e:any) {
		if (
			!e.target.classList.contains('custom-select-option') &&
      !e.target.classList.contains('selected-text')
		) {
			setShowOptionList(false);
		}
	}

	function handleOptionClick(option: Option) {
		selection(option);
		setDefaultOption(option);
		handleListDisplay();
	}

	function handleListDisplay() {
		setShowOptionList(prevValue => !prevValue);
	}

	function displayOptions() {
		return options.flatMap(option => {
			if(option.id !== defaultOption.id) {
				return (
					<li
						className="custom-select-option"
						data-name={option.name}
						key={option.id}
						onClick={() => handleOptionClick(option)}
					>
						{option.name}
					</li>
				);
			}
		});
	}

	return(
		<div className="select">
			<h3 className="select--title">Select temporality</h3>
			<div className="custom-select-container">
				<div
					className={showOptionList ? 'selected-text active' : 'selected-text'}
					onClick={handleListDisplay}
				>
					{defaultOption.name}
				</div>
				{showOptionList && (
					<ul className="select-options">
						{displayOptions()}
					</ul>
				)}
			</div>
		</div>
	);
}
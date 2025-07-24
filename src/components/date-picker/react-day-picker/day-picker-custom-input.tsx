import "react-day-picker/style.css";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import { IoCalendarClearOutline } from "react-icons/io5";
import styled from "styled-components";

const DayPickerCustomInputContainer = styled.article`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;

  p {
    font-size: 20rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  padding: 0.5rem;
  font-size: inherit;
  background-color: white;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: var(--forest);
    outline: none;
  }

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }

  @media (min-width: 1024px) {
    padding: 0.75rem;
    font-size: 1.25rem;
  }
`;

const CalendarButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
`;

const CalendarIcon = styled(IoCalendarClearOutline)`
  color: var(--forest);
  font-size: 15px;
`;

const DropdownContainer = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  background-color: gray;
  padding: 1rem;
  border-radius: 0.375rem;
`;

const DayPickerCustomInput = () => {
  // const defaultClassNames = getDefaultClassNames();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setValue(format(date, "yyyy-MM-dd"));
    }
    setIsOpen(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    const parsedDate = parse(e.target.value, "yyyy-MM-dd", new Date());
    if (isValid(parsedDate)) setSelectedDate(parsedDate);
    else setSelectedDate(undefined);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <DayPickerCustomInputContainer>
      <Wrapper ref={wrapperRef}>
        <InputWrapper>
          <StyledInput
            type="text"
            value={value}
            placeholder="yyyy-MM-dd"
            onChange={handleInputChange}
          />
          <CalendarButton
            type="button"
            onClick={() => setIsOpen(true)}
            aria-controls="dialog"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-label="Open calendar to choose booking date"
          >
            <CalendarIcon />
          </CalendarButton>
        </InputWrapper>
        {isOpen && (
          <DropdownContainer>
            <DayPicker
              animate
              captionLayout="dropdown"
              navLayout="around"
              autoFocus
              mode="single"
              selected={selectedDate}
              onSelect={handleDayPickerSelect}
              locale={ko}
              formatters={{
                formatYearDropdown: (year) => `${year.getFullYear()}년`,
              }}
              className="fill-forest"
              // 여기는 tailwindCSS 아니라서 못씀. 다른 방법 필요
              // classNames={{
              //   chevron: "fill-forest size-[2rem]",
              //   today: "border-forest",

              //   day: `${defaultClassNames.day} !w-16 !h-16 md:!w-18 md:!h-18`,
              //   day_button: `${defaultClassNames.day_button} !w-16 !h-16 md:!w-18 md:!h-18`,

              //   dropdowns: "flex flex-row-reverse gap-6",
              //   selected: `${defaultClassNames.selected} !border-forest !text-[1.3rem]`,
              //   weekday: `${defaultClassNames.weekday} !w-8`,
              // }}
              defaultMonth={selectedDate}
            />
          </DropdownContainer>
        )}
      </Wrapper>
    </DayPickerCustomInputContainer>
  );
};

export default DayPickerCustomInput;

import { useEffect, useRef, useState } from 'react';

export function FormAddTask() {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsContentVisible(false);
      } else if (
        formRef.current &&
        formRef.current.contains(event.target as Node)
      ) {
        setIsContentVisible(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form ref={formRef} id="form-add-task">
      <input type="text" id="title-task-input" placeholder="Todo name ..." />
      {isContentVisible && (
        <>
          <textarea
            id="description-area"
            placeholder="Desctiption ..."
          ></textarea>
          <div>
            <input type="submit" />
            <input type="date" />
          </div>
        </>
      )}
    </form>
  );
}

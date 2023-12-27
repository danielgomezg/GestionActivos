<script>
    let start, end

    const handleDateChange = (event) => {
        const { target } = event;
        const date = new Date(target.value);

        this.dateRange = {
            start: this.dateRange.start === null ? date : this.dateRange.start,
            end: date,
        };
    }

</script>
<div class="date-picker">
    <div class="start-date">
      <input
        type="date"
        value={start}
        onChange={ () => console.log('change date picker') }
      />
    </div>
</div>

<style>
    .date-picker {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .date-picker .start-date,
    .date-picker .end-date {
        width: 100%;
        margin-bottom: 10px;
    }

    .date-picker .start-date label,
    .date-picker .end-date label {
        font-size: 16px;
    }

    .date-picker .start-date input,
    .date-picker .end-date input {
        width: 100%;
        height: 56px;
        border-radius: 4px;
        border: 1px solid #ccc;
        /* padding: 10px; */
        font-size: 16px;
        box-sizing: border-box;
    }
</style>
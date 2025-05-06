import React from 'react'

const SelectOption = ({ data, platform, setPlatform }: any) => {
    return (
        <div
            key={data.id}
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: "auto",
                height: "40px",
                borderRadius: "5px",
                border: `1px solid ${platform === data.value ? "#E20B18" : "#E0E0E0"}`,
                color: platform === data.value ? "#E20B18" : "#000000",
                cursor: data.disabled ? "not-allowed" : "pointer",
                gap: '6px',
                paddingLeft: '10px',
                paddingRight: '10px',
                backgroundColor: data.disabled ? "#F0F0F0" : "#FFF"
            }}
            onClick={() => {
                if (!data.disabled) {
                    setPlatform(data.value)
                }
            }}
        >

            <div
                style={{
                    width: 16,
                    height: 16,
                    borderWidth: "1px",
                    borderRadius: '5px',
                    border: `1px solid ${platform === data.value ? "#E20B18" : "#828282"}`,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        width: 11,
                        height: 11,
                        backgroundColor: platform === data.value ? "#E20B18" : "#FFF",
                        borderRadius: '5px',
                    }}
                >
                </div>
            </div>

            <img
                src={platform === data.value ? data.imgactive : data.img}
                alt={data.label}
                style={{
                    width: 20,
                    height: 20,
                    borderWidth: "2px",
                }}
            />
            <span
                key={data.id}
                style={{
                    marginLeft: "5px",
                    cursor: "pointer",
                    fontWeight: 400,
                    color: platform === data.value ? "#E20B18" : '#000',
                    fontSize: '14px'
                }}
            >
                {data.label}
            </span>
        </div>
    )
}

export default SelectOption

import { MenuItem, Pagination, Select, Typography, styled } from "@mui/material";
import { memo, useMemo } from "react";

export interface TablePaginationProps{
    page: number;
    size: number;
    pageOptions: Array<number>;
    selectedPageOption: number;
    totalCount: number;
    onChangeRowsPerPage?: (event:any) => void;
    onPageChange?: (event:number) => void;
    showNextPage?: boolean;
    showTotalCount?: boolean;
};

const StyledPagination = styled('div')(({  }) => {
    return {
      '& .MuiPaginationItem-root.Mui-selected': {
        'background-color': 'transparent',
        'color': '#333'
      },
      '& .MuiPaginationItem-root.Mui-selected:hover': {
        'background-color': 'transparent',
        'color': '#333'
      },
      '& .MuiPaginationItem-root': {
        'color': '#111111',
        'opacity': '1'
      }
    };
});

export function TablePagination({
    page,
    size,
    pageOptions,
    selectedPageOption,
    totalCount,
    onChangeRowsPerPage,
    onPageChange,
    showNextPage,
    showTotalCount = true,
}: TablePaginationProps){
    
    const firstItemIndex = useMemo(()=>
        Math.ceil((page-1)*size) + 1
    ,[page, size]);

    const lastItemIndex = useMemo(()=>
        firstItemIndex + size > totalCount ? totalCount : firstItemIndex + size -1
    ,[firstItemIndex, size]);

    const totalPages = useMemo(()=>
        totalCount% size === 0 ? Math.floor(totalCount/size): Math.floor(totalCount/size)+1
    ,[totalCount, size]);

    return (
        <div style={{
            borderTop: '1px solid #E0E0E0',
            borderBottom: '1px solid #E0E0E0',
            padding: '5px 0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Typography  sx={{
                color: '#333',
                fontFamily: 'Inter',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '19.6px',
                letterSpacing: '1%',
              }}>{firstItemIndex}-{lastItemIndex} {showTotalCount && <span>of {totalCount} items</span>}</Typography>
            <div style={{
                display:'flex',
                flexDirection: 'row',
                gap:'15px'
            }}>
                <StyledPagination>
                    <Pagination count={totalPages} page={page} onChange={(_:any, page:number)=>{onPageChange && onPageChange(page)}}/>
                </StyledPagination>
                <Select
                    value={selectedPageOption}
                    onChange={(e: any) => onChangeRowsPerPage && onChangeRowsPerPage(e)}
                    label=""
                    sx={{
                        border: '1px solid black',
                        width: 'fit-content',
                        height: '32px',
                        borderRadius: '4px',
                        padding: '8px 8px 8px 8px',
                    }}
                >
                    {
                        pageOptions.map(pagedata => (
                            <MenuItem
                                sx={{
                                    color: '#11111',
                                }}
                                key={pagedata}
                                value={pagedata}>
                                    {pagedata}
                            </MenuItem>
                        ))
                    }
                </Select>
            </div>
        </div>
    );
};
export default memo(TablePagination);
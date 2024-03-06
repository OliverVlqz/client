import { Badge, Button, Card, Label, TextInput } from 'flowbite-react';
import React, { useEffect, useMemo } from 'react'
import { useState } from 'react';
import AxiosClient from '../../config/http-gateway/http-client';
import TableComponent from '../../components/TableComponent';
import { MdSearch } from "react-icons/md";
import { AiFillEdit, AiOutlineDelete, AiOutlineDoubleLeft } from "react-icons/ai";

const UserPage = () => {
    const [loadin, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [filterText, setFilterText] = useState("");
    const columns = useMemo(() => [
        {
            name: "#",
            cell: (row, index) => <>{index + 1}</>,
            sortable: true,
            selector: (row, index) => index + 1,
        },
        {
            name: "Usuario",
            cell: (row, index) => <>{row.username}</>,
            sortable: true,
            selector: (row, index) => row.username,
        },
        {
            name: "Rol",
            cell: (row, index) => <>{row.roles[0].name}</>,
            sortable: true,
            selector: (row, index) => row.roles[0].name,
        },
        {
            name: "Estado",
            cell: (row) => <Badge color={row.status ? 'success' : 'failure'}>
                {row.status ? 'Activo' : 'Inactivo'}
            </Badge>,
            selector: (row) => row.status,
            sortable: true,
        },
        {
            name: "Acciones",
            cell: (row) => (
                <><div className='flex gap-2 p-2'>
                    <Button className='' outline size={'sm'} pill color='warning'>
                        {
                            <AiFillEdit />
                        }
                    </Button>
                    <Button
            outline
            pill
            color={row.status ? "failure" : "success"}
            size={"sm"}
          >
            {row.status ? <AiOutlineDelete /> : <AiOutlineDoubleLeft />}
          </Button>
                </div>
                </>
            ),
        },
    ]);

    const getUsers = async () => {
        try {
            setLoading(true);
            const response = await AxiosClient({
                url: "/user/",
                method: "GET",
            });
            console.log(response);
            if (!response.error) {
                setUsers(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);
    const filter = ()=>{
        return users.filter((user)=>user.username.includes(filterText));
    }

    return (
        <>
            <section className="flex flex-col pt-4 px-3">
                <h4 className='text-2xl'>Usuarios</h4>
                <div className='flex w-full justify-between py-4'>
                    <div className="max-w-md">
                        <Label htmlFor="search" value="Your email" />
                        <TextInput 
                        id="search" 
                        type="text" 
                        rightIcon={MdSearch} 
                        value={filterText}
                        placeholder="Buscar..."
                        onChange={(e)=> setFilterText(e.target.value)}
                        />
                    </div>
                    <div className='flex items-end'>
                        <Button pill outline color='success'>
                            AGREGAR
                        </Button>
                    </div>
                </div>
                <Card>
                    <TableComponent columns={columns} data={filter()} progress={loadin} />
                </Card>
            </section>
        </>
    )
}

export default UserPage
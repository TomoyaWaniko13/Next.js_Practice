"use client"

import {Button} from "@/components/ui/button"
import {useToast} from "@/components/ui/use-toast"

const ExperimentalToast = () => {
    const {toast} = useToast();

    return (
        <Button
            variant="outline"
            onClick={() => {
                console.log('clicked');
                toast({
                    description: "Your message has been sent.",
                })
            }}
        >
            Show Toast
        </Button>
    )
}

export default ExperimentalToast;